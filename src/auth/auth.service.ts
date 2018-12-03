import { LoginService } from './../login/login.service';
import { JwtPayload } from './interfaces/jwt-payload';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly loginService: LoginService) { }

  async sign(payload: JwtPayload): Promise<string> {
    return await this.jwtService.sign(payload);
  }

  async validateUser(payload: JwtPayload) {
    return !!this.loginService.getByUsername(payload.username);
  }
}