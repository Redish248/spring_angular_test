import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {User} from '../../entities/User';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {AuthService} from '../auth.service';
import {catchError, retry} from 'rxjs/operators';
import {MainService} from '../main.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  constructor(private router: Router, private auth: AuthService) { }
  log = '';
  pass = '';
  log_in(login: string, password: string) {
    document.getElementById('login_error').innerText = '';
    if (password === '' || login === '') {
      document.getElementById('login_error').innerText = 'Empty data!';
    } else {
      this.auth.login(login, password).subscribe((response) => {
        // console.log(response);
        sessionStorage.setItem('password', password);
        this.router.navigate(['main']);
      }, (error) => {
        document.getElementById('login_error').innerText = 'Wrong login or password';
      });
    }
  }

  ngOnInit() {
  }

}
