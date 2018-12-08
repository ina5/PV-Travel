"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class LoginService {
    constructor() {
        this.users = [
            { username: 'ivan', password: '123' },
        ];
    }
    isLoggedIn(user) {
        return !!this.users.find(x => x.username === user.username && x.password === user.password);
    }
    getByUsername(username) {
        return this.users.find(x => x.username === username);
    }
}
exports.LoginService = LoginService;
//# sourceMappingURL=login.service.js.map