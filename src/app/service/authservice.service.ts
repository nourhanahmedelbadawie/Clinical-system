import { Injectable, NgZone } from '@angular/core';
import { User } from '../interface/user';
import { auth } from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from "@angular/router";
import { AngularFireDatabase } from'angularfire2/database';
// import swal from 'sweetalert';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
@Injectable({
providedIn: 'root'
})
export class AuthService {
  public redirectURL:any;
  public image:any={};
  userData: any; // Save logged in user data
  currentobject={};
  public token;
  constructor(
  public afs: AngularFirestore,   // Inject Firestore service
  public afAuth: AngularFireAuth, // Inject Firebase auth service
  public router: Router,  
  public ngZone: NgZone, // NgZone service to remove outside scope warning
  public db:AngularFireDatabase,
  private http: HttpClient,

  ) {    
    this.setUserFromFirebase();
  }

  async setUserFromFirebase(){
    /* Saving user data in localstorage when 
  logged in and setting up null when logged out */
  return await this.afAuth.authState.subscribe(user => {
    if (user) {
      this.userData = user;
      localStorage.setItem('user', JSON.stringify(this.userData));
      JSON.parse(localStorage.getItem('user'));
    } else {
      localStorage.setItem('user', "empty");
      // JSON.parse(localStorage.getItem('user'));
    }
  })
  }
  // Sign in with email/password
  signInUsers(email:string,password:string){
    return this.afAuth.auth.signInWithEmailAndPassword(email, password).then((result) => {
      this.afAuth.auth.currentUser.getIdToken().then(
        (token:string)=> {this.token=token;
        console.log("testtttt",this.token) 
        
        // this.ngZone.run(() => {
      
         }
      ) 
     return result;
    })
    // .catch((error) => {
    //   window.alert(error.message);
      
    // })
  }
  // Sign up with email/password
  async signUpUsers(email, password) {
    return await this.afAuth.auth.createUserWithEmailAndPassword(email, password)
    .then((result) => {
    console.log(result)
    this.afAuth.auth.currentUser.getIdTokenResult().then((token)=> {
      this.token=token.claims.user_id;
      console.log("testtttt",this.token)  
      this.currentobject = this.afs.collection('/clinical-system-b5ad4').snapshotChanges();
    console.log( this.currentobject)
      this.SendVerificationMail();
      this.SetUserData(result.user);
    }) 
    }).catch((error) => {
      // window.alert(error.message)
   

    })
  }
  // test
  getEmployees() {
    return this.afs.collection('/clinical-system-b5ad4').snapshotChanges();
  }
  // Send email verfificaiton when new user sign up
  SendVerificationMail() {
    return this.afAuth.auth.currentUser.sendEmailVerification()
    .then(() => {
      // this.router.navigate(['/home']);
    })
  }
  // Reset Forggot password
  ForgotPassword(passwordResetEmail) {
    return this.afAuth.auth.sendPasswordResetEmail(passwordResetEmail)
    .then(() => {
      window.alert('Password reset email sent, check your inbox.');
    }).catch((error) => {
      // window.alert(error)
      // swal("Error", error.message, "error");

      
    })
  }
  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null && user.emailVerified !== false) ? true : false;
  }
  // Sign in with Google
  async GoogleAuth() {
    await this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }
  // Auth logic to run auth providers
  AuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
    .then((result) => {
      this.ngZone.run(() => {
      this.router.navigate(['dashboard']);
      })
      this.SetUserData(result.user);
    }).catch((error) => {
      // window.alert(error)
      // swal("Error", error.message, "error");

    })
  }
  /* Setting up user data when sign in with username/password, 
  sign up with username/password and sign in with social auth  
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  SetUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const userData = { 
      email: user.email,
      password:user.password
  }
  return userRef.set(userData, {
    merge: true
  })
  }
  // facebook
  FacebookAuth() {
    return this.AuthLogin(new auth.FacebookAuthProvider());
  }  
  // Sign out 
  SignOut() {
    return this.afAuth.auth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['/side/signin']);
      //  this.is_LoggedIn = false;
       localStorage.setItem('userdetails', "empty");

    })
  }


  // test
getPeople(){
return new Promise<any>((resolve, reject) => {
  this.afs.collection('/people').snapshotChanges()
  .subscribe(snapshots => {
    resolve(snapshots)
  })
})
}
// gurd
isAuthenticated(){
  console.log("ppp",localStorage.getItem("user"))
  if(localStorage.getItem("user")!="empty"){
    return true;
    
  }
  else{
    return false;

  }
 
  // return this.token !=null;
}


// get url
setredirecturl(url){
 
   this.redirectURL=url;
 debugger;
}


 
}



