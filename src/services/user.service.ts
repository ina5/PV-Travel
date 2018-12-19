import { GetUserDTO } from './../dto/get-user.dto';
import { UserEntity } from 'src/data-base/entity/user.entity';
import { Injectable, HttpStatus } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from 'typeorm';
import { LoginUserDTO } from 'src/dto/login-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from 'src/interfaces/jwt.interface';
import { CreateUserDTO } from 'src/dto/create-user.dto';
import { IsEmpty } from 'class-validator';


@Injectable()
export class UsersService {
    constructor(@InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>) {
    }
    async signIn(user: LoginUserDTO): Promise<GetUserDTO> {
        const userFound: GetUserDTO = await this.userRepository.findOne({ select: ['username', 'email', 'password'], where: { username: user.username } });

        if (userFound) {
            const result = await bcrypt.compare(user.password, userFound.password);
            if (result) {
                return userFound;
            }
        }

        return null;
    }

    async validateUser(payload: JwtPayload): Promise<GetUserDTO> {
        const userFound: GetUserDTO = await this.userRepository.findOne({ where: { username: payload.username } });
        return userFound;
    }
    async registerUser(user: CreateUserDTO) {
    
        const userFoundByEmail = await this.userRepository.findOne({ where: { email: user.email } });
        const userFoundByUsername = await this.userRepository.findOne({ where: { username: user.username } });

        if (userFoundByEmail || userFoundByUsername) {
            throw new Error('User not found!');
        }

        user.password = await bcrypt.hash(user.password, 10);

        await this.userRepository.create(user);

        const result = await this.userRepository.save([user]);

        return result;
    }
    async findAll(): Promise<UserEntity[]> {
        return await this.userRepository.find();
    }
    async  findOne(username) {
        const result: any = this.userRepository.findOne(username);
        if (result) {
            return result;
        }
        else if (IsEmpty(result)) {
            return HttpStatus.NOT_FOUND;
        }
    }
    async  remove(id) {
        this.userRepository.delete(id);
        // if (foundUserIndex) {
        //     this.userRepository.delete(foundUserIndex)
        //     this.users.splice(index, 1);
        //     return HttpStatus.NO_CONTENT;
        // }
        // else { return HttpStatus.NOT_FOUND; }
    }
}