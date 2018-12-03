export class LoginService {
    private readonly users: any[] = [
        { username: 'ivan', password: '123' },
    ];

    isLoggedIn(user: any) {
        return !!this.users.find(
            x =>
                x.username === user.username && x.password === user.password);
    }

    getByUsername(username: string): boolean {
        return this.users.find(x => x.username === username);
    }
}