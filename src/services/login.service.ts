import { CreateUserDTO } from './../dto/create-user.dto';
import { LoginUserDTO } from '../dto/login-user.dto';
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/data-base/entity';
import { JwtPayload } from 'src/interfaces/jwt.interface';
@Injectable()
export class LoginService {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
    ) { }
    async signIn(user: LoginUserDTO): Promise<any> {
        const userFound: any = await this.usersRepository.findOne({ select: ['username', 'password'], where: { username: user.username } });

        if (userFound) {
            const result = await bcrypt.compare(user.password, userFound.password);
            if (result) {
                return userFound;
            }
        }

        return null;
    }

    async validateUser(payload: JwtPayload): Promise<any> {
        const userFound: any = await this.usersRepository.findOne({ where: { username: payload.username } });
        return userFound;
    }
    async registerUser(user: CreateUserDTO) {
        const userFound = await this.usersRepository.findOne({ where: { email: user.email } });

        if (userFound) {
            throw new Error('User not found!');
        }

        user.password = await bcrypt.hash(user.password, 10);
        await this.usersRepository.create(user);

        const result = await this.usersRepository.save([user]);

        return result;
    }
}