import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '../interfaces/jwt.interface';
import { LoginService } from './login.service';

@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService, private readonly loginService: LoginService) { }
    async sign(payload: JwtPayload) {
        return this.jwtService.sign(payload);
    }
    async validateUser(payload: JwtPayload) {
        return !!this.loginService.getByUserName(payload.username);
    }
}