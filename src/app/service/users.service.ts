import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  public UserDataa:any={};
  constructor() { }
  setUserData(userdata){
    console.log(userdata)
    this.UserDataa=userdata;
    console.log( this.UserDataa)   
  }
  getUserData(){
    console.log(this.UserDataa);
    return this.UserDataa;
  
  }
  
}
