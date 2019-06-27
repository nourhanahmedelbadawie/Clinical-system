import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class GuardCalSerService implements CanActivate {
select_btnclicked:boolean=false
  canActivate(): boolean {
    if(this.select_btnclicked){
     return true


    }
    else{
      return false 
    }
  }

  constructor( public router: Router) { }
}
