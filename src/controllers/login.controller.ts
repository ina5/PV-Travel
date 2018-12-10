import { UsersService } from '../services/user.service';
import { LoginUserDTO } from '../dto/login-user.dto';
import { AuthService } from '../services/auth.service';
import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';

@Controller()
export class LoginController {
    constructor(
        private readonly authService: AuthService,

        private readonly userService: UsersService) { }

    @Post('login')
    async login(@Body(new ValidationPipe({
        whitelist: true,
        transform: true,
    })) loginUserDTO: LoginUserDTO) {
        this.authService.sign({username: loginUserDTO.username});

        // if (this.loginService.isLoggedIn(loginUserDTO)) {
        //     return await this.authService.sign({ username: loginUserDTO.username });
        // }
        // else {
        //     return 'No such user!';
        // }
    }
}
