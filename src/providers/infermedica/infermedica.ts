import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import 'rxjs/add/operator/map';
/*
  Generated class for the InfermedicaProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class InfermedicaProvider {

  appKey: string = "cd4a3b2d102d66a610a53facf2823f01"
  appId: string = "aabe17ac"

  constructor(public http: Http) {
    console.log('Hello InfermedicaProvider Provider');
  }

  parse(data) {
    return new Promise((resolve, reject) => {

      let headers = new Headers();
      headers.append('Cache-Control', 'no-cache')
      headers.append('Content-Type', 'application/json');
      headers.append('app-key', this.appKey),
      headers.append('app-id', this.appId)
      
      this.http.post("https://api.infermedica.com/v2/parse", JSON.stringify(data), { headers: headers })
        .subscribe(res => {
          let data = res.json()
          resolve(data.mentions)
        }, (err) => {
          reject(err)
        })
    })
  }

  toDiagnosis(data){
    return new Promise((resolve,reject)=> {

      let headers = new Headers();
      headers.append('Cache-Control', 'no-cache')
      headers.append('Content-Type', 'application/json');
      headers.append('app-key', this.appKey),
      headers.append('app-id', this.appId)

      this.http.post("https://api.infermedica.com/v2/diagnosis", JSON.stringify(data), {headers: headers})
          .subscribe(res =>{
            let data = res.json()
            resolve(data.question)
          },(err)=>{
            reject(err)
          })
    })
  }
}
