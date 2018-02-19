import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './shared/authentication.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Yummy';

  isLoggedIn: boolean;

  constructor(
    private router: Router,
    private auth: AuthenticationService) {}

  ngOnInit() {
    if (!JSON.parse(localStorage.getItem('currentUser'))) {
      return this.isLoggedIn = false;
    }
    return this.isLoggedIn = true;
  }

  logout(): boolean {
    this.auth.logout();
    return this.isLoggedIn = false;
  }
}
