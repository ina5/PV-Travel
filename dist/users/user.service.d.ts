import { User } from './interfaces/user.interface';
export declare class UsersService {
    private readonly users;
    create(user: User): void;
    findAll(): User[];
    findOne(id: any): User;
    remove(id: any): void;
}
