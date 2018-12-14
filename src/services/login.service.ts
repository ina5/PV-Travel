import { LoginUserDTO } from '../dto/login-user.dto';
import { Injectable } from '@nestjs/common';
@Injectable()
export class LoginService {
    private readonly users: LoginUserDTO[] = [
        { username: 'ivan', password: '123' },
    ];

    isLoggedIn(user: LoginUserDTO) {
        return !!this.users.find(
            x =>
                x.username === user.username && x.password === user.password);
    }
    getByUserName(username: string): any {
        return this.users.find(x => x.username === username);
    }
}