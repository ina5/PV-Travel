import { LoggedInUser } from './../users/loggedInUser';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import * as jwt_decode from 'jwt-decode';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<LoggedInUser>;
    private loggedIn: LoggedInUser;
    public currentUser: Observable<LoggedInUser>;
    constructor(private http: HttpClient) {
        //   this.currentUserSubject = new BehaviorSubject<LoggedInUser>(JSON.parse(this.token));

        if (localStorage.getItem('currentUser') === null) {
            console.log('We do not have user yet!');
        } else {
            this.loggedIn = new LoggedInUser();
            const decodedUser = this.getDecodedAccessToken(localStorage.getItem('currentUser'));
            this.loggedIn = decodedUser;
            this.loggedIn.token = localStorage.getItem('currentUser');
            this.currentUserSubject = new BehaviorSubject<LoggedInUser>(this.loggedIn);
            this.currentUser = this.currentUserSubject.asObservable();
        }
    }
    public currentUserValue(): LoggedInUser {
        if (this.currentUserSubject !== undefined) {

            return this.currentUserSubject.value;
        }
        return null;
    }

    login(username: string, password: string) {
        return this.http.post<any>('http://localhost:3000/auth/login', { username, password })
            .pipe(map(user => {
                if (user.token) {
                    localStorage.setItem('currentUser', user.token);
                    // this.currentUserSubject.next(user.token);
                }

                return user.token;
            }));
    }
    logout() {
        if (localStorage.getItem('currentUser') !== null) {
            // remove user from local storage to log user out
            localStorage.removeItem('currentUser');
            this.currentUserSubject.next(null);
        }
    }
    private getDecodedAccessToken(token: string): any {
        try {
            return jwt_decode(token);
        } catch (Error) {
            //  return Error('Invalid token!');
            return null;
        }
    }
}
