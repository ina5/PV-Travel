import { GetUserDTO } from './../dto/get-user.dto';
import { UserEntity } from 'src/data-base/entity/user.entity';
import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOperator } from 'typeorm';
import { LoginUserDTO } from 'src/dto/login-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from 'src/interfaces/jwt.interface';
import { RoleEntity } from 'src/data-base/entity';
import { CreateUserWithRoleDTO } from 'src/dto/userWithRole.dto';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
        // tslint:disable-next-line:align
        @InjectRepository(RoleEntity)
        private readonly roleRepository: Repository<RoleEntity>) {
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
    async registerUser(user: CreateUserWithRoleDTO) {
        const userFoundByEmail = await this.userRepository.findOne({ where: { email: user.email } });
        const userFoundByUsername = await this.userRepository.findOne({ where: { username: user.username } });

        if (userFoundByEmail || userFoundByUsername) {
            return HttpStatus.CONFLICT;
        }
        const roleUser = (await this.roleRepository.findOne({ where: { name: 'user' } }));
        user.role = roleUser;
        user.password = await bcrypt.hash(user.password, 10);
        await this.userRepository.create(user);
        await this.userRepository.save([user]);
        return HttpStatus.CREATED;
    }
    async findAll(): Promise<UserEntity[]> {
        return await this.userRepository.find();
    }
    async  findOne(id) {
        const result: any = await this.userRepository.findOne(id);
        if (result) {
            return result;
        }
        return HttpStatus.NOT_FOUND;

    }
    async findByCriteria(query) {
        const searchCriteria1 = Object.keys(query)[0];
        const searchCriteria2 = Object.keys(query)[1];
        const searchValue1 = query[searchCriteria1];
        const searchValue2 = query[searchCriteria2];
        // console.log(searchCriteria1.concat(searchCriteria2));
        // console.log(searchValue1.concat(searchValue2));
        //        const foundUser = await this.userRepository.findOneOrFail({ searchCriteria1: searchValue1 });
        const foundUser = await this.userRepository.find({ where: { username: searchValue1, email: searchValue2 } });
        if (foundUser) {
            return foundUser;
        }
        return HttpStatus.NOT_FOUND;

    }
    async  remove(id) {
        const userFoundById = await this.userRepository.findByIds(id);
        if (userFoundById) {
            await this.userRepository.delete(id);
            return HttpStatus.NO_CONTENT;
        }
        return HttpStatus.NOT_FOUND;
    }
}