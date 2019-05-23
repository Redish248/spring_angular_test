import { Component, OnInit } from '@angular/core';
import {MainService} from '../main.service';
import {Router} from '@angular/router';
import {AuthService} from '../auth.service';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(private router: Router, private main: MainService, private auth: AuthService) { }

  data: string;
  filter: string;
  login = '';
  password = sessionStorage.getItem('password');
  users;

  ngOnInit() {

    this.main.getUserData().subscribe(response => {
      this.login = response.login;
    }, error1 => {
      console.log(error1);
    });
    this.get_users();
  }

  log_out() {
    this.auth.logout().subscribe(response => {
        this.router.navigate(['']);
    },
      error => {
      console.log(error);
      });
  }

  get_users() {
    this.main.getUsers().subscribe(response => {
      this.users = response;
    });
  }

  search() {
   this.main.search(this.filter, this.data).subscribe(response => {
     this.users = response;
   });
  }

}
