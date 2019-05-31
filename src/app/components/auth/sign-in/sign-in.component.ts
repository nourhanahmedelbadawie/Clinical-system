import { Component, OnInit, NgZone } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../../service/authservice.service';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { UsersService } from '../../../service/users.service';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  datamyuser={};
  myInnerHeight = window.innerHeight;
  flagin = false;
  errMsgin: string;
  userModel = {
    email: "",
    password: ""
  }
  list = {};

  data;


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
    const email = form.value.email;
    const password = form.value.password;
    this.authservice.signInUsers(email, password).then(result => {
      this.data = this.db.list('/clinical-system-b5ad4/clinical-system-b5ad4')
      // this.db.collection('/people').snapshotChanges()
      //   .subscribe(snapshots => {
      //     resolve(snapshots)
      //   })
      //  debugger;
      console.log(this.data)
      this.data=this.db.list('/clinical-system-b5ad4', ref => ref.orderByChild('email')
      .equalTo(email)
      ).valueChanges()
    .subscribe(userdata => {
      console.log(userdata); // Check the returned values;
      this.datamyuser=userdata;
      this.userData.setUserData(this.datamyuser);
      this.ngZone.run(() => {
        this.router.navigate(['dashboard']);
        })
    })
    
    

      //  const db =this.db.database.ref('clinical-system-b5ad4')
      //  const data =this.db.orderByChild('email').equalTo(email).on("child_added",function(snapshot){
      //            console.log(snapshot.key)
      //  })

      //   console.log(data)
      // return new Promise<any>((resolve, reject) => {
      //   this.firestore.collection('/clinical-system-b5ad4').snapshotChanges()
      //     .subscribe(snapshots => {
      //       resolve(snapshots)
      //       console.log(snapshots)
      //     })
      // })

      // this.ngZone.run(() => {
       
      //   });     
    }).catch((error) => {
      window.alert(error.message)
      this.router.navigate(['signin']);
      debugger;
    });
    //  test
    //  this.authservice.getEmployees().subscribe(actionArray => {
    //   this.list = actionArray.map(item => {
    //     return {
    //       item
    //     } 
    //   })
    // });
    // console.log(this.list)

  }

  GoogleAuth() {
    this.authservice.GoogleAuth();
  }
  FacebookAuth() {
    this.authservice.FacebookAuth()
  }





}
