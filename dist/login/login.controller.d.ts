import { LoginUserDTO } from './../users/dto/login-user.dto';
import { AuthService } from './../auth/auth.service';
import { LoginService } from './login.service';
export declare class LoginController {
    private readonly authService;
    private readonly loginService;
    constructor(authService: AuthService, loginService: LoginService);
    login(user: LoginUserDTO): Promise<string>;
}
