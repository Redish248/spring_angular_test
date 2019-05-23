import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }


  login(login: string, password: string) {

    const sendParams = new HttpParams()
      .append('username', login)
      .append('password', password);

    return this.http.post('http://localhost:8080/login', null, {
      params: sendParams,
      withCredentials: true,
      observe: 'response'
    });
    }

  register(login: string, name: string, email: string, password: string) {
    const sendParams = new HttpParams()
    .append('login', login)
    .append('email', email)
    .append('name', name)
    .append('password', password);
    return this.http.post('http://localhost:8080/web/signup', null, {
      params: sendParams,
      withCredentials: true,
      observe: 'response'
    });
  }

  logout() {
    return this.http.post('http://localhost:8080/logout', null, {
      withCredentials: true
    });
  }
}
