import { Component, OnInit, NgZone } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../../service/authservice.service';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { UsersService } from '../../../service/users.service';
import Swal from 'sweetalert2';
// import swal from 'sweetalert';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  public testt:any;
  public datamyuser={};
  myInnerHeight = window.innerHeight;
  public flagin = false;
  public errMsgin: string;
  public userModel = {
    email: "",
    password: ""
  }
  public list = {};
  public data;
  constructor(public authservice: AuthService,
    public ngZone: NgZone,
    public router: Router,
    public db: AngularFireDatabase,
    private firestore: AngularFirestore,
    public afAuth: AngularFireAuth,
    private userData:UsersService) { }

  ngOnInit() {

  }
  // signin
   onSignIn(form: NgForm) {


    document.getElementById("loading").style.display="inline-block"



    const email = form.value.email;
    const password = form.value.password;
    this.authservice.signInUsers(email, password).then(result => {
      this.data = this.db.list('/clinical-system-b5ad4/clinical-system-b5ad4')
      console.log(this.data)
      this.data=this.db.list('/clinical-system-b5ad4', ref => ref.orderByChild('email')
      .equalTo(email)
      ).valueChanges()
    .subscribe(async userdata => {
      console.log(userdata); // Check the returned values;
      this.datamyuser=userdata;
      this.userData.setUserData(this.datamyuser);
      localStorage.setItem("userdetails",JSON.stringify(this.datamyuser))
      // debugger
      await this.authservice.setUserFromFirebase()
      // debugger
      this.ngZone.run(() => {
        this.checkURL();
        // this.router.navigate(['home']);


 //===redirect to calinder url
 if(localStorage.getItem("cal_url")){

  this.router.navigate([localStorage.getItem("cal_url")]);

  localStorage.removeItem("cal_url")
}else{
  this.router.navigate(['/home'])
}



        });
    })
    }).catch((error) => {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        type: 'error',
        confirmButtonText: 'Close'
      })
      document.getElementById("loading").style.display="none"
      // debugger;
      // swal("Error", error.message, "error");
      //  window.alert(error.message)
      // this.router.navigate(['/signin']);
    });
  }

  GoogleAuth() {
    this.authservice.GoogleAuth();
  }
  FacebookAuth() {
    this.authservice.FacebookAuth()
  }
  // checkurl
  checkURL(){
    debugger
  this.testt= this.authservice.redirectURL
  if(this.testt=="/home"){
    this.router.navigate(['home']);
  }else{
    this.router.navigateByUrl(this.testt);
  }
  console.log(this.testt)
    return this.testt;

  }
}
