import { Injectable } from '@angular/core';


@Injectable()
export class GlobalServiceProvider {
  private rootScope:any;
  
  constructor() {
   this.rootScope ={} ;
  }

  public get(name:string):any{
    return this.rootScope(name);
  }

  public set(name:string, value :any):void{
    this.rootScope[name]= JSON.parse(JSON.stringify(value));
  }

  public setCircular(name:string, value:any): void{
    this.rootScope[name]= value;
  }

  public assign(name: string, value:any):void{
    let data = this.get[name] || {};
    data = Object.assign(data,value)
    this.set(name,data)
  }

}
