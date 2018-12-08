import { Injectable, HttpStatus } from '@nestjs/common';
import { User } from './interfaces/user.interface';
import { IsEmpty } from 'class-validator';

@Injectable()
export class UsersService {
    private readonly users: User[] = [];

    create(user: User) {
        this.users.push(user);
        HttpStatus.OK;
    }

    findAll(): User[] {
        return this.users;
    }
    findOne(id) {
        const result: any = this.users.find(user => user.id === +id);
        if (result) {
            return result;
        }
        else if (IsEmpty(result)) {
            return HttpStatus.NOT_FOUND;
        }
    }
    remove(id) {
        const foundUserIndex = this.users.find(user => user.id === id);
        if (foundUserIndex) {
            const index = this.users.indexOf(foundUserIndex);
            this.users.splice(index, 1);
            return HttpStatus.NO_CONTENT;
        }
        else { return HttpStatus.NOT_FOUND; }
    }
}