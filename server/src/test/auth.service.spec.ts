import { UserTokenDto } from './../dto/user-token.dto';
import { LoginUserDTO } from './../dto/login-user.dto';
import { AuthService } from './../auth/auth.service';
import { UsersService } from './../services/user.service';
import { JwtServiceMock } from './mocks/jwt.service.mock';
import { JwtPayload } from './../interfaces/jwt.interface';

jest.mock('./../services/user.service');
describe('AuthService', () => {

    it('should call userService validateUser method', async () => {
        // Arrange
        const userService = new UsersService(null, null);
        const jwtService = new JwtServiceMock(null);
        const authService = new AuthService(userService, jwtService);
        const payload: JwtPayload = {
            username: 'test',
        };
        jest.spyOn(userService, 'validateUser').mockImplementation(() => {
            return true;
        });
        // Act
        await authService.validateUser(payload);
        expect(userService.validateUser).toHaveBeenCalledTimes(1);
    });
    it('should call userService  method', async () => {
        // Arrange
        const userService = new UsersService(null, null);
        const jwtService = new JwtServiceMock(null);
        const authService = new AuthService(userService, jwtService);
        const userFound = new LoginUserDTO();
        const userToken = new UserTokenDto();

        jest.spyOn(jwtService, 'sign').mockImplementation(async () => {
            return 'token';
        });
        jest.spyOn(userService, 'signIn').mockImplementation(async () => {
            return userToken;
        });
        const user = await authService.signIn(userFound);
        // Act & Assert
        expect(user.token).toBe('token');
    });
    it('should return exception', async () => {
        // Arrange
        const userService = new UsersService(null, null);
        const jwtService = new JwtServiceMock(null);
        const authService = new AuthService(userService, jwtService);
        const userFound = new LoginUserDTO();
        let msg = '';

        jest.spyOn(jwtService, 'sign').mockImplementation(async () => {
            return undefined;
        });
        jest.spyOn(userService, 'signIn').mockImplementation(async () => {
            return undefined;
        });

        try {
            await authService.signIn(userFound);
        } catch (error) {
            msg = error.message.message;

        }
        // Act & Assert
        expect(msg).toBe('Wrong credentinals');
    });
});