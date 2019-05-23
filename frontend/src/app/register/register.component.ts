import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private router: Router, private auth: AuthService) { }
  login = '';
  name = '';
  email = '';
  password = '';
  repeat = '';

  register(login: string, name: string, email: string, password: string, repeat: string) {
    document.getElementById('register_error').innerText = '';
    if (password === '' || login === '' || email === '' || name === '' || repeat === '') {
      document.getElementById('register_error').innerText = 'Empty data!';
    } else {
      if (repeat !== password) {
        document.getElementById('register_error').innerText = 'Current and repeated passwords must be equals!';
      } else {
        this.auth.register(login, name, email, password).subscribe((response) => {
          this.auth.login(login, password).subscribe((resp) => {
            this.router.navigate(['/main']);
          });
        }, error1 => {
          document.getElementById('register_error').innerText = 'User already exists! Or something else is wrong';
        });
      }
    }
  }

  ngOnInit() {
  }

}
