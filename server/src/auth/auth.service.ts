import { LoggedInUserDTO } from 'src/dto/loggedInUser-dto';

import { LoginUserDTO } from './../dto/login-user.dto';
import { JwtPayload } from './../interfaces/jwt.interface';
import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { GetUserDTO } from 'src/dto/get-user.dto';
import { UsersService } from './../services/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService) { }

  public async signIn(user: LoginUserDTO): Promise<LoggedInUserDTO> {
    const userFound: LoggedInUserDTO = await this.userService.signIn(user);
    if (userFound) {
      const token = await this.jwtService.sign({ username: userFound.username, role: userFound.role });
      userFound.token = token;
      return userFound;
    } else {
      throw new NotFoundException('Wrong credentinals');
    }
  }
  async validateUser(payload: JwtPayload): Promise<GetUserDTO> {

    return await this.userService.validateUser(payload);
  }
}