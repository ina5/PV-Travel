import { LoginUserDTO } from './../users/dto/login-user.dto';
import { AuthService } from './../auth/auth.service';
import { LoginService } from './login.service';
import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';

@Controller()
export class LoginController {
    constructor(
        private readonly authService: AuthService,

        private readonly loginService: LoginService) { }

    @Post('login')
    async login(@Body(new ValidationPipe({
        whitelist: true,
        transform: true,
    })) loginUserDTO: LoginUserDTO)
    {
        if (this.loginService.isLoggedIn(loginUserDTO)) {
            return await this.authService.sign({ username: loginUserDTO.username });
        }
        else {
            return 'No such user!';
        }
    }
}
