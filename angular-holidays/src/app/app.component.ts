import { LoggedInUser } from './users/loggedInUser';

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './users/user';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currentUser: LoggedInUser;
  constructor(private router: Router,
    private authenticationService: AuthenticationService) {
    if (this.authenticationService.currentUser) {

      this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    }
  }
  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}
