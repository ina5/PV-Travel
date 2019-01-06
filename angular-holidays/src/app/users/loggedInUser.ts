import { Role } from './role';

export class LoggedInUser {

    username: string;
    role: Role;
    token?: string;
}
