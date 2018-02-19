import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../shared/authentication.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  user: any = {};

  constructor(private auth: AuthenticationService) { }

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    return this.auth.getUser().subscribe(user => {
      this.user = user.data;
    });
  }
}
