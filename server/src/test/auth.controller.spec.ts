import { LoggedInUserDTO } from 'src/dto/loggedInUser-dto';
import { BadRequestException } from '@nestjs/common';
import { LoginUserDTO } from './../dto/login-user.dto';
import { AuthService } from './../auth/auth.service';
import { AuthController } from './../controllers/auth.controller';
import { JwtServiceMock } from './mocks/jwt.service.mock';
import { Test } from '@nestjs/testing';
import { PassportModule } from '@nestjs/passport';
import { UsersService } from './../services/user.service';

jest.mock('./../auth/auth.service');
jest.mock('./../services/user.service');

describe('AuthController', () => {

    it('should call AuthService signIn method', async () => {
        // Arrange
        const userService = new UsersService(null, null);
        const authenticationService = new AuthService(userService, null);
        const controller = new AuthController(authenticationService, userService);
        const user = new LoginUserDTO();

        jest.spyOn(authenticationService, 'signIn').mockImplementation(() => {
            return 'token';
        });

        // Act
        await controller.sign(user);

        // Assert
        expect(authenticationService.signIn).toHaveBeenCalledTimes(1);
    });
    it('should call AuthService signIn method', async () => {
        // Arrange
        const userService = new UsersService(null, null);
        const authenticationService = new AuthService(userService, null);
        const controller = new AuthController(authenticationService, userService);
        const user = new LoginUserDTO();

        jest.spyOn(authenticationService, 'signIn').mockImplementation(() => {
            return {};
        });

        // Act
        await controller.sign(user);
        const foundUser = await authenticationService.signIn(user);

        // Assert
        expect(foundUser).toEqual(user);

    });
    // it('should call AuthService signIn method', async () => {
    //     // Arrange
    //     const userService = new UsersService(null, null);
    //     const authenticationService = new AuthService(userService, null);
    //     const controller = new AuthController(authenticationService, userService);
    //     const user = new LoginUserDTO();

    //     jest.spyOn(authenticationService, 'signIn').mockImplementation(() => {
    //         return undefined;
    //     });
    //     // const foundUser = await authenticationService.signIn(user);

    //     // Act
    //     // await controller.sign(foundUser);

    //     // Assert
    //     expect(controller.sign(user)).toEqual(undefined);
    // });
});
