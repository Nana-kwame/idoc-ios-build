import { User } from './../../models/user';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';

@Injectable()
export class Auth {

  public token: any;
  private isLogged = false;
  public jwtToken:any;
  

  constructor(public http: Http, public storage: Storage) {

  }

  checkAuthentication() {

    return new Promise((resolve, reject) => {

      //Load token if exists
      this.storage.get('token').then((value) => {

        this.token = value;

        let headers = new Headers();
        headers.append('Authorization', this.token);

        this.http.get('https://shrouded-sierra-32605.herokuapp.com/api/auth/protected', { headers: headers })
          .subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          });

      });

    });

  }

  createAccount(details) {

    return new Promise((resolve, reject) => {

      let headers = new Headers();
      headers.append('Content-Type', 'application/json');

      this.http.post('https://shrouded-sierra-32605.herokuapp.com/api/auth/register', JSON.stringify(details), { headers: headers })
        .subscribe(res => {

          let data = res.json();
          this.token = data.token;
          this.storage.set('token', data.token);
          resolve(data);

        }, (err) => {
          reject(err);
        });

    });

  }

  login(credentials): Promise<User> {

    return new Promise((resolve, reject) => {

      let headers = new Headers();
      headers.append('Content-Type', 'application/json');

      return this.http.post('https://shrouded-sierra-32605.herokuapp.com/api/auth/login', JSON.stringify(credentials), { headers: headers })
        .subscribe(res => {

          let data = res.json();
          this.token = data.token;
          // this.user = data.user;
          this.storage.set('token', data.token);
          resolve(data);

          resolve(res.json());
        }, (err) => {
          reject(err);
        });

    });

  }

  logout() {
    this.storage.set('token', '');
  }

  saveUserData(user) {
    //localStorage.setItem('token',token);
     localStorage.setItem('user', JSON.stringify(user));

     //this.jwtToken = token;
     
    
  }

  getUserData(): any {
    return localStorage.getItem('user');
  }


}