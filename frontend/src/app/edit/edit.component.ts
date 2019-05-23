import { Component, OnInit } from '@angular/core';
import {MainService} from '../main.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  constructor(private router: Router, private main: MainService) { }

  name: string;
  login: string;
  email: string;
  currentPass: string;
  pass: string;
  user;

  ngOnInit() {
    this.main.getUserData().subscribe(response => {
      this.user = response;
    }, error1 => {
      console.log(error1);
    });
  }


  edit(type: string, text: string, password: string) {
    document.getElementById('errors').innerText = '';
    if (text === '' || text === undefined) {
      document.getElementById('errors').innerText = 'Some data is empty!';
    } else {
      if (password === '' || password === undefined) {
        document.getElementById('errors').innerText = 'You must enter password!';
      } else {
        document.getElementById('errors').innerText = '';
        this.main.edit_info(type, text, password).subscribe(response => {
            document.getElementById('errors').innerText = type + ' saved';
            this.main.getUserData().subscribe((resp) => {
              this.user = resp;
            }, error1 => {
              console.log(error1);
            });
        },
          error => {
            document.getElementById('errors').innerText = type + ' did not save';
          });
      }
    }
  }

}
