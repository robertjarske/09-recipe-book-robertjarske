import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthenticationService {

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService
  ) {}

  login(username: string, password: string) {
    return this.http.post<any>(`${environment.YUMMI_API}/auth/login`, { email: username, password: password })
      .map(user => {
        if (user && user.data.access_token) {
          localStorage.setItem('currentUser', JSON.stringify(user));
        }
        console.log(user);
        return user;
      });
  }

  logout() {
    localStorage.removeItem('currentUser');
  }


  register(name: string, email: string, password: string) {
    return this.http.post<any>(`${environment.YUMMI_API}/auth/register`, { name: name, email: email, password: password })
      .map(user => {
        return user;
      });
  }

  getUser() {

    const jsonParse = JSON.parse(localStorage.getItem('currentUser'));
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization':  `Bearer ${jsonParse.data.access_token}`
      })
    };

    return this.http.get<any>(`${environment.YUMMI_API}/auth/user`, httpOptions)
    .map(user => {
      return user;
    });
  }

}
