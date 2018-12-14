import { AuthService } from '../auth/auth.service';
import { LoginUserDTO } from '../dto/login-user.dto';
import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { LoginService } from '../services/login.service';

@Controller()
export class LoginController {
    constructor(
        private readonly authService: AuthService,

        private readonly loginService: LoginService) { }

    @Post('login')
    async login(@Body(new ValidationPipe({
        whitelist: true,
        transform: true,
    })) loginUserDTO: LoginUserDTO) {
        this.authService.sign({username: loginUserDTO.username});

        if (this.loginService.isLoggedIn(loginUserDTO)) {
            return await this.authService.sign({ username: loginUserDTO.username });
        }
        else {
            return 'No such user!';
        }
    }
}
