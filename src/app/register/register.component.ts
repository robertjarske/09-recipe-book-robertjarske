import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../shared/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  model: any = {};
  loading = false;
  returnUrl: string;

  constructor(
    private router: Router,
    private auth: AuthenticationService
  ) { }

  ngOnInit() {
  }

  register() {
    this.auth.register(this.model.fullname, this.model.email, this.model.password)
      .subscribe(
        data => {
          this.router.navigate(['/login']);
        },
        error => {
          console.error(error);
        }
      );
  }


}
