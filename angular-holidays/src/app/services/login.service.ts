
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable({
    providedIn: 'root'
})
export class LoginService {

    private loginUrl = 'http://localhost:3000/auth/login';

    constructor(
        private http: HttpClient) { }
    getLogin() {
        return this.http.get(this.loginUrl);
    }
}
