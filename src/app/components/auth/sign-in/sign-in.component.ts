import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../../service/authservice.service';



@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  flagin=false;
  errMsgin:string;
  userModel={
    email:"",
    password:""
  }

  constructor(public authservice:AuthService) { }

  ngOnInit() {
  }
  // signin
  onSignIn(form : NgForm){
    const email=form.value.email;
    const password=form.value.password;
   this.authservice.signInUsers(email,password);
   
  }
  GoogleAuth(){
  this.authservice.GoogleAuth();
  }
 
  
   


}
