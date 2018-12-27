import { CreateUserWithRoleDTO } from 'src/dto/userWithRole.dto';
import { UsersService } from 'src/services/user.service';
import { CreateUserDTO } from './../dto/create-user.dto';
import { AuthService } from '../auth/auth.service';
import { LoginUserDTO } from '../dto/login-user.dto';
import { Controller, Post, Body, ValidationPipe, BadRequestException, HttpStatus, Get } from '@nestjs/common';
import { RoleEntity } from 'src/data-base/entity';
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
        user: CreateUserDTO,
    ): Promise<any> {
        try {
            const userWithRole = new CreateUserWithRoleDTO();
            userWithRole.firstName = user.firstName;
            userWithRole.lastName = user.lastName;
            userWithRole.email = user.email;
            userWithRole.username = user.username;
            userWithRole.password = user.password;
            userWithRole.role = null;
            await this.userService.registerUser(userWithRole);
            return HttpStatus.CREATED;
        } catch (error) {
            await new Promise((resolve, reject) => {
                resolve();
            });

            return (error.message);
        }
    }
}