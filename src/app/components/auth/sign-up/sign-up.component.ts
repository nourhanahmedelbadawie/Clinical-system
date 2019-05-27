import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
// import { AuthService } from '../../../service/auth.service';
import {User} from '../../../interface/user';
import {AngularFireDatabase} from 'angularfire2/database';
import { Router } from '@angular/router';
import {AngularFireAuth} from '@angular/fire/auth'
import { AuthService } from '../../../service/authservice.service';



@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  myInnerHeight=window.innerHeight;
  public cities=["Giza","Alexandria","Shubra el-Khema","Port Said","Suez","El Mahalla el Kubra","El Mansoura"]
    userModel:User={
    username:"",
    email:"",
    city:"",
    gender: true ,
    date:"",
    password:"",
    phoneNumber:"",
    conpassword:""
  }
 
  constructor(private db:AngularFireDatabase,
    public route:Router,
    public authservice:AuthService) {    
  }

  ngOnInit() {
    
  }
  
  onSignUp(form:NgForm){
    const email=form.value.email;
    const password=form.value.password;
    
    // this.authService.signUpUsers(email,password)
    console.log(form.value);
    // insert in database
    this.db.list('/clinical-system-b5ad4').push({
      username:form.value.username,
      email:form.value.email,
      phoneNumber:form.value.phone,
      city:form.value.city,
      gender:form.value.gender,
      date:form.value.date,
      password:form.value.password
    });
    this.route.navigate(['/success']);

    this.authservice.signUpUsers(email,password);
    console.log(email);
    console.log(password)
  }
  GoogleAuth(){
    this.authservice.GoogleAuth();
    }
    FacebookAuth(){
      this.authservice.FacebookAuth()
    }
  

}
