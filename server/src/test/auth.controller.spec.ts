import { UserTokenDto } from './../dto/user-token.dto';
import { LoginUserDTO } from './../dto/login-user.dto';
import { AuthService } from './../auth/auth.service';
import { AuthController } from './../controllers/auth.controller';
import { UsersService } from './../services/user.service';
import { RoleEntity } from './../data-base/entity';

jest.mock('./../auth/auth.service');
jest.mock('./../services/user.service');

describe('AuthController', () => {

    it('should call AuthService signIn method', async () => {
        // Arrange
        const userService = new UsersService(null, null);
        const authenticationService = new AuthService(userService, null);
        const controller = new AuthController(authenticationService, userService);
        const user = new LoginUserDTO();
        user.username = 'test';
        user.password = '1435';
        const userToken = new UserTokenDto();
        userToken.username = 'test';
        userToken.role = new RoleEntity();

        jest.spyOn(authenticationService, 'signIn').mockImplementation(() => {
            return userToken;
        });

        // Act
        await controller.sign(user);

        // Assert
        expect(authenticationService.signIn).toHaveBeenCalledTimes(1);
    });
    it('check if users are equal', async () => {
        // Arrange
        const userService = new UsersService(null, null);
        const authenticationService = new AuthService(userService, null);
        const controller = new AuthController(authenticationService, userService);
        const user = new LoginUserDTO();
        user.username = 'test';
        const userToken = new UserTokenDto();
        userToken.username = 'test';

        jest.spyOn(authenticationService, 'signIn').mockImplementation(() => {
            return userToken;
        });

        // Act
        await controller.sign(user);
        const foundUser = await authenticationService.signIn(user);

        // Assert
        expect(foundUser.username).toEqual(user.username);

    });
    it('should catch error if user exist', async () => {
        // Arrange
        const userService = new UsersService(null, null);
        const authenticationService = new AuthService(userService, null);
        const controller = new AuthController(authenticationService, userService);
        const user = new LoginUserDTO();
        // Act
        const isLoggedIn = await controller.sign(user).catch(() => {
            return 'I work';
        });
        // Assert
        expect(isLoggedIn).toBe('I work');
    });
});

// describe('AuthController', () => {
//     it('should call UserService registerUser method', async () => {
//         // Arrange
//         const userService = new UsersService(null, null);
//         const authenticationService = new AuthService(userService, null);
//         const controller = new AuthController(authenticationService, userService);
//         const user = new CreateUserDTO();

//         jest.spyOn(userService, 'registerUser').mockImplementation(() => {
//             return HttpStatus.CREATED;
//         });

//         // Act
//         await controller.register(user);

//         // Assert
//         expect(userService.registerUser).toHaveBeenCalledTimes(1);
//     });
// });