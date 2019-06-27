import { Component, OnInit, NgZone } from '@angular/core';
import { NgForm } from '@angular/forms';
import {User} from '../../../interface/user';
import {AngularFireDatabase} from 'angularfire2/database';
import { Router } from '@angular/router';
import {AngularFireAuth} from '@angular/fire/auth'
import { AuthService } from '../../../service/authservice.service';
import { AngularFireStorage } from 'angularfire2/storage';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AngularFirestore } from '@angular/fire/firestore';
import { async } from 'q';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  public bgform:{};
 public idval:number;
 data;
 datasignup;
  public formval={};
  selectedFiles: FileList;
  public downloadURL;
  public ref;
  public task;
  public uploadProgress;
  public url:string="";
  myInnerHeight=window.innerHeight;
  public cities=["Giza","Alexandria","Shubra el-Khema","Port Said","Suez","El Mahalla el Kubra","El Mansoura"]
    userModel:User={
    name:"",
    email:"",
    city:"",
    gender: true ,
    date:"",
    password:"",
    confirmPassword:"",
    phone:"",
    image:"" 
  }
 
  constructor(private db:AngularFireDatabase,
    public route:Router,
    public ngZone: NgZone,
    public authservice:AuthService,
    private afStorage: AngularFireStorage,
    private httpService:HttpClient,
    public afs: AngularFirestore,   // Inject Firestore service
    ) { 
     
  }
  dat;
  ngOnInit() {
  }
  
  async onSignUp(form:NgForm){

    document.getElementById("loading").style.display="inline-block"







    let name=form.value.name;
    let email=form.value.email;
    let password=form.value.password;
    let gender=form.value.gender;
    let phone=form.value.phone;
    let city=form.value.city;
    let date=form.value.date;

   this.bgform={
     name,
     email,
     password,
     gender,
     phone,
     city,
     date
   }
   for(var formm in  this.bgform){
     if(this.bgform[formm] ===null || this.bgform[formm]===undefined || this.bgform[formm]==="" || this.bgform[formm]===true ){
      delete this.bgform[formm];
     }
   }
   console.log( this.bgform)
   debugger
  //  send form to backend
  debugger
   await this.httpService.post<any>("http://172.16.2.28:8069/clinical_management_system/patient/new/"
   ,JSON.stringify (this.bgform)).subscribe( async res=>{
     this.idval= await res;
     console.log("res 22",res)
     if(res==="this email already exist"){
      Swal.fire({
        title: 'Error!',
        text: 'This email already exist',
        type: 'error',
        confirmButtonText: 'OK'
      })
      document.getElementById("loading").style.display="none"
      // window.alert("this email already exist")
     }
    //  check id
    if( this.idval>0){
      await this.authservice.signUpUsers(email,password).then(result => {
       this.db.list('/clinical-system-b5ad4').push({
      name:form.value.name,
      email:form.value.email,
      phone:form.value.phone,
      city:form.value.city,
      gender:form.value.gender,
      date:form.value.date,
      password:form.value.password,
      image:this.url,
      token:this.authservice.token,
      id:this.idval,
    });
  

    this.idval=0;
    // send token and id to backend
       this.db.list('/clinical-system-b5ad4', ref => ref.orderByChild('email')
      .equalTo(email)
      ).valueChanges()
    .subscribe(async userdata => {
      let token=userdata[0]["token"];
      let id=userdata[0]["id"];
      let objsend={token,
      id}
      await this.httpService.post<any>("http://172.16.2.28:8069/clinical_management_system/patient/token"
    ,JSON.stringify(objsend)).subscribe(res=>{
     res;
      console.log("res 22",res)      
   }) 
  }

    )
    this.data=this.db.list('/clinical-system-b5ad4', ref => ref.orderByChild('email')
    .equalTo(email)
    ).valueChanges()
    .subscribe(async userdata => {
    console.log(userdata); // Check the returned values;
    this.datasignup=await userdata;
    await localStorage.setItem("userdetails",JSON.stringify(this.datasignup))
     this.authservice.setUserFromFirebase()
     this.ngZone.run(() => {
      // this.route.navigate(['/home']);
      });
      
 //===redirect to calinder url
 if(localStorage.getItem("cal_url")){

  this.route.navigate([localStorage.getItem("cal_url")]);

  localStorage.removeItem("cal_url")
}else{
  this.route.navigate(['/home'])
}
  
  })
  }).catch((error) => {
  // swal("Error", error.message, "error");
  debugger
   console.log(error.message)
   debugger
  // this.router.navigate(['/signin']);
})


  
  }
})
  }
  GoogleAuth(){
    this.authservice.GoogleAuth();
    }
    FacebookAuth(){
      this.authservice.FacebookAuth()
    }
  //  upload image
  upload(event) {
    
    this.url=`/upload/to/this-path${Math.random()}`
    this.afStorage.upload(this.url, event.target.files[0]);  
    const randomId = Math.random().toString(36).substring(2);
    this.ref = this.afStorage.ref(randomId);
    this.task = this.ref.put(event.target.files[0]);
    this.uploadProgress = this.task.percentageChanges();
  }


}
