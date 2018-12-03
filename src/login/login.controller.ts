import { LoginUserDTO } from './../users/dto/login-user.dto';
import { AuthService } from './../auth/auth.service';
import { LoginService } from './login.service';
import { Controller, Post, Body } from '@nestjs/common';

@Controller()
export class LoginController {
    constructor(
        private readonly authService: AuthService,

        private readonly loginService: LoginService) { }

    @Post('login')
    async login(@Body() user: LoginUserDTO) {
        if (this.loginService.isLoggedIn(user)) {
            return await this.authService.sign({ username: user.username });
        }
        else {
            return 'No such user!';
        }
    }
}
