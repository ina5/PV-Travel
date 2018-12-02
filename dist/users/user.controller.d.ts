import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './user.service';
import { HttpStatus } from '@nestjs/common';
export declare class UsersController {
    private readonly userService;
    constructor(userService: UsersService);
    create(createUserDto: CreateUserDto): void;
    findAll(): import("./interfaces/user.interface").User[] | HttpStatus.NOT_FOUND;
    findOne(id: any): import("./interfaces/user.interface").User;
    remove(id: any): void;
}
