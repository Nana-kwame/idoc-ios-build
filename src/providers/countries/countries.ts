import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/map';
@Injectable()
export class CountriesProvider {

  data: any;
  constructor(public http: Http) {
    console.log('Hello CountriesProvider Provider');
  }

load(){
  if(this.data){
    return  Promise.resolve(this.data);
  }

  return new Promise(resolve => {
    this.http.get('assets/data/countries.json').map(res => res.json()).subscribe();
    
    resolve(this.data)
  })
}
  
}
