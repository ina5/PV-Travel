import { User } from './../interfaces/user.interface';
export class CreateUserDto implements User {
    readonly id: number;
    readonly firstName: string;
    readonly lastName: string;
    readonly userName: string;
    readonly password: string;
    readonly email: string;
}