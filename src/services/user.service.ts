import { GetUserDTO } from './../dto/get-user.dto';
import { UserEntity } from 'src/data-base/entity/user.entity';
import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoginUserDTO } from 'src/dto/login-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from 'src/interfaces/jwt.interface';
import { RoleEntity } from 'src/data-base/entity';
import { CreateUserDTO } from 'src/dto/create-user.dto';

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
    async registerUser(user: CreateUserDTO) {
        console.log(user);
        // Check if user is already exist (by Email and Username)
        const userFoundByEmail = await this.userRepository.findOne({ where: { email: user.email } });
        console.log(userFoundByEmail);
        const userFoundByUsername = await this.userRepository.findOne({ where: { username: user.username } });
        console.log(userFoundByUsername);
        if (userFoundByEmail || userFoundByUsername) {
            return HttpStatus.CONFLICT;
        }
        // Get UserRole from DataBase or create it if does not exist
        const roleUser = (await this.roleRepository.findOne({ where: { name: 'user' } }));
        console.log(roleUser);
        if (roleUser === undefined) {
            const roleEntityUser = new RoleEntity();
            roleEntityUser.name = 'user';
            console.log(roleEntityUser);
            await this.roleRepository.create(roleEntityUser);
            await this.roleRepository.save([roleEntityUser]);
            const roleEntityAdmin = new RoleEntity();
            roleEntityAdmin.name = 'admin';
            await this.roleRepository.create(roleEntityAdmin);
            await this.roleRepository.save([roleEntityAdmin]);
        }
        user.password = await bcrypt.hash(user.password, 10);
        const foundRoleUser = (await this.roleRepository.findOne({ where: { name: 'user' } }));
        const userEntity = new UserEntity();
        console.log(userEntity);
        userEntity.firstName = user.firstName;
        userEntity.lastName = user.lastName;
        userEntity.username = user.username;
        userEntity.password = user.password;
        userEntity.email = user.email;
        userEntity.role = foundRoleUser;
        // Save user into DataBase
        await this.userRepository.create(userEntity);
        await this.userRepository.save([userEntity]);
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