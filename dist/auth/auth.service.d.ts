import { LoginService } from './../login/login.service';
import { JwtPayload } from './interfaces/jwt-payload';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private readonly jwtService;
    private readonly loginService;
    constructor(jwtService: JwtService, loginService: LoginService);
    sign(payload: JwtPayload): Promise<string>;
    validateUser(payload: JwtPayload): Promise<boolean>;
}
