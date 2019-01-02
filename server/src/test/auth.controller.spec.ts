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
    let authService: AuthService = new AuthService(null, null);
    let authController: AuthController;
    let jwtServiceMock: JwtServiceMock;

    beforeAll(async () => {
        jwtServiceMock = new JwtServiceMock({});
        const module = await Test.createTestingModule({
            imports: [PassportModule.register({
                defaultStrategy: 'jwt',
            })],
            controllers: [AuthController],
            providers: [UsersService,
                {
                    provide: AuthService,
                    useValue: authService,
                },
                {
                    provide: 'UserRepository',
                    useValue: {
                        findOne: () => {
                            return 'user';
                        },
                    },
                }],
        }).compile();

        authController = module.get<AuthController>(AuthController);
    });

    it('should call AuthService signIn method', async () => {
        const user = new LoginUserDTO();
        jest.spyOn(authService, 'signIn').mockImplementation(() => {
            return 'token';
        });
        await authController.sign(user);
        expect(authService.signIn).toHaveBeenCalledTimes(1);
    });

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
});
