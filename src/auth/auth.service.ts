import { LoginUserDTO } from './../dto/login-user.dto';
import { JwtPayload } from './../interfaces/jwt.interface';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginService } from '../services/login.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly loginService: LoginService,
    private readonly jwtService: JwtService) { }

  public async signIn(user: LoginUserDTO): Promise<string> {
    const userFound: any = await this.loginService.signIn(user);
    if (userFound) {
      return this.jwtService.sign({ username: userFound.username, isAdmin: userFound.isAdmin });
    } else {
      return null;
    }
  }
  async validateUser(payload: JwtPayload): Promise<any> {
    return await this.loginService.validateUser(payload);
  }
}