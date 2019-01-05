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
});