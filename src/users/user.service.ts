import { Injectable } from '@nestjs/common';
import { User } from './interfaces/user.interface';

@Injectable()
export class UsersService {
    private readonly users: User[] = [];

    create(user: User) {
        this.users.push(user);
    }

    findAll(): User[] {
        return this.users;
    }
    findOne(id) {
        return this.users.find(user => user.id === id);
    }
    remove(id) {
        const foundUserIndex = this.users.find(user => user.id === id);
        const index = this.users.indexOf(foundUserIndex);
        this.users.splice(index, 1);
    }
}