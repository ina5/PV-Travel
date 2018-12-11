import { AuthService } from '../auth/auth.service';
import { Controller, Post, Body } from '@nestjs/common';
import { LoginService } from '../services/login.service';

@Controller()
export class AuthController {
    // constructor(
    //     private readonly authService: AuthService,
    //     private readonly loginService: LoginService) { }

    // @Post('login')
    // async login(@Body() user) {
    //     if (this.loginService.isLoggedIn(user)) {
    //         return await this.authService.sign({ username: user.username });
    //     }
    //     else {
    //         return 'No such user!';
    //     }
    // }
}