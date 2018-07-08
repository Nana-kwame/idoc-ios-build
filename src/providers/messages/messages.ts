import { Auth } from './../auth/auth';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../models/user';
import { Http, Headers } from '@angular/http';

/*
  Generated class for the MessagesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MessagesProvider {
  loginParams: { token: string, user: User }
  notifications: any[] = []
  constructor(public http: Http, public authService: Auth) {
    this.loginParams = JSON.parse(this.authService.getUserData());
    console.log('Message Provider ', this.loginParams);
  }

  getNotifications() {
    setInterval(() => {

      let hosID = this.loginParams.user.hosID
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');

      this.http.get("https://secure-cliffs-90491.herokuapp.com/userNotifications/" + hosID, { headers: headers })
        .map(res => res.json()).subscribe(
          data => {
            this.notifications = data.message;
          }
        )
    }, 10000);
    return this.notifications.length
  }

getRecords(){
  return new Promise((resolve, reject) => {
    let hosID = this.loginParams.user.hosID

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    this.http.get("https://obscure-dusk-24642.herokuapp.com/patient/" + hosID, { headers: headers }).map(res => res.json())
      .subscribe(res => {
       let data = res
        resolve(data.message.diagnosis)
        console.log("Trying my luck ",data.message.diagnosis)
        return data.message.diagnosis
      });

  })
}
// getDiag(){
//   return new Promise((resolve, reject) => {
//     let hosID = this.loginParams.user.hosID

//     let headers = new Headers();
//     headers.append('Content-Type', 'application/json');

//     this.http.get("https://obscure-dusk-24642.herokuapp.com/patient/" + hosID, { headers: headers }).map(res => res.json())
//       .subscribe(res => {
//        let data = res
//        console.log(res.message.diagnosis) 
//        return res.message.diagnosis
        
//       });

//   })
// }
  getNots() {
    return new Promise((resolve, reject) => {
      let hosID = this.loginParams.user.hosID
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');

      setInterval(() => {
        this.http.get("https://secure-cliffs-90491.herokuapp.com/userNotifications/" + hosID, { headers: headers })
          .map(res => res.json())
          .subscribe(
            data => {
              this.notifications = data.message;
              resolve(this.notifications)
            },(err)=>{
              reject(err)
            }
          )



      }, 10000);
    })




  }

}
