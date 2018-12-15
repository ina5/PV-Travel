import { CreateUserDTO } from './../dto/create-user.dto';
import { AuthService } from '../auth/auth.service';
import { LoginUserDTO } from '../dto/login-user.dto';
import { Controller, Post, Body, ValidationPipe, BadRequestException, HttpStatus } from '@nestjs/common';
import { LoginService } from '../services/login.service';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,

        private readonly loginService: LoginService) { }

    @Post('login')
    async sign(@Body(new ValidationPipe({
        transform: true,
        whitelist: true,
    })) user: LoginUserDTO): Promise<string> {
        const token = await this.authService.signIn(user);
        if (!token) {
            throw new BadRequestException('Wrong credentials!');
        }

        return token;
    }

    @Post('register')
    async register(
        @Body(new ValidationPipe({
            transform: true,
            whitelist: true,
        }))
        user: CreateUserDTO,
    ): Promise<any> {
        try {
            await this.loginService.registerUser(user);
            return HttpStatus.CREATED;
        } catch (error) {
            await new Promise((resolve, reject) => {
                resolve();
            });

            return (error.message);
        }
    }
}