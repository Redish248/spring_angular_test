import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor(private http: HttpClient) { }

   getUserData() {
     return this.http.get('http://localhost:8080/web/get_user', {
       withCredentials: true
     });
  }

  edit_info(type: string, text: string, password: string) {
    const sendParams = new HttpParams()
      .append('type', type)
      .append('text', text)
      .append('password', password);
    return this.http.post('http://localhost:8080/web/edit', null, {
      params: sendParams,
      withCredentials: true,
      observe: 'response'
    });
  }

  getUsers() {
    return this.http.get('http://localhost:8080/web/get_all_users', {
      withCredentials: true
    });
  }

  search(type: string, text: string) {
    const url = '?type=' + type + '&text=' + text;
    return this.http.get('http://localhost:8080/web/users_by_filter' + url, {
      withCredentials: true
    });

  }

}
