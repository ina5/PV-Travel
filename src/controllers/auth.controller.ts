import { UsersService } from 'src/services/user.service';
import { CreateUserDTO } from './../dto/create-user.dto';
import { AuthService } from '../auth/auth.service';
import { LoginUserDTO } from '../dto/login-user.dto';
import { Controller, Post, Body, ValidationPipe, BadRequestException, HttpStatus, Get, HttpException } from '@nestjs/common';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,

        private readonly userService: UsersService) { }

    @Post('login')
    async sign(@Body(new ValidationPipe({
        transform: true,
        whitelist: true,
    })) user: LoginUserDTO): Promise<string> {
        const token = await this.authService.signIn(user);
        if (!token) {
            throw new BadRequestException('Wrong');
        }
        return token;
    }

    @Post('register')
    async register(
        @Body(new ValidationPipe({
            transform: true,
            whitelist: true,
        }))
        createUser: CreateUserDTO,
    ) {
        if (Object.keys(createUser).length === 0) {
            throw new HttpException({
                status: HttpStatus.FORBIDDEN,
                error: 'User is not valid',
            }, 403);
        }
        const user = await this.userService.registerUser(createUser);
        return user;
    }
}