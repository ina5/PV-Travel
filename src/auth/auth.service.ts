
import { LoginUserDTO } from './../dto/login-user.dto';
import { JwtPayload } from './../interfaces/jwt.interface';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { GetUserDTO } from 'src/dto/get-user.dto';
import { UsersService } from 'src/services/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService) { }

  public async signIn(user: LoginUserDTO): Promise<string> {
    const userFound: GetUserDTO = await this.userService.signIn(user);
    if (userFound) {
      return this.jwtService.sign({ email: userFound.email });
    } else {
      return null;
    }
  }
  async validateUser(payload: JwtPayload): Promise<GetUserDTO> {
    return await this.userService.validateUser(payload);
  }
}