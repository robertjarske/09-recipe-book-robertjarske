import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../shared/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: any = {};
  loading = false;
  returnUrl: string;

  constructor(
    private auth: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
  }

  login() {
    this.auth.login(this.model.username, this.model.password)
      .subscribe(data => {
          this.router.navigate(['/']);
        },
        error => {
          console.error(error);
        }
      );
  }

}
