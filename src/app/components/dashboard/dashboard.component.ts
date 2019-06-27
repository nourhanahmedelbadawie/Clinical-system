import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../service/users.service';
import { AngularFireStorage } from 'angularfire2/storage';
import { AuthService } from '../../service/authservice.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { async } from '@angular/core/testing';
// import swal from 'sweetalert';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public nonevisitst :any
 // public visits:any;
 public objid={}
 public id;
 public user;
 public userDataDatails={};
 public downloadURL;
 public visits=[];
 public draftvisit:Array<any>=[];
 public confirmedvisit:Array<any>=[];
 public donevisit:Array<any>=[];
 public canceled={};
 public done=false;
 public cancelvisits:Array<any>=[];
   constructor(public authservice:AuthService,private afStorage: AngularFireStorage, private router:Router,   private httpService:HttpClient) { }
   ngOnInit() {
     this.userDataDatails=JSON.parse(localStorage.getItem("userdetails"));
     this.id=  this.userDataDatails[0]["id"];
     console.log( typeof(this.id))
     debugger
     if(this.userDataDatails[0].image!=null && this.userDataDatails[0].image.length >0){
      this.downloadURL=this.afStorage.ref(this.userDataDatails[0].image).getDownloadURL();
     }
    
    //  get from backend
     this.httpService.get<any>("http://172.16.2.28:8069/clinical_management_system/patient?patient_id="+this.id
     ).subscribe(res=>{
      console.log("lolo",res)
       this.visits=res;

      
       for(let i=0;i<this.visits.length;i++){
              if(this.visits[i]["visittype"]==="type1"){
                this.visits[i]["visittype"]="Medical Consultation";
              }else{
                this.visits[i]["visittype"]="Check Up";
              }
         if(this.visits[i]["visitstatus"]=="Draft"){
           this.draftvisit.push(this.visits[i])
         }
         else if(this.visits[i]["visitstatus"]=="Comfirmed"){
           this.confirmedvisit.push(this.visits[i])
         }
         else if(this.visits[i]["visitstatus"]=="Done"){
           this.donevisit.push(this.visits[i])
         }
          else if(this.visits[i]["visitstatus"]=="Canceled"){
             this.cancelvisits.push(this.visits[i])
           }
       }
         
   })
   // testtttttttttttttt
  //  this.visits= [{visittime: "2019-05-26 13:55:27", visitid: "2", visitdoctor: "esraa maher abu daheb", visitstatus: "Draft", visittype: "type1"},
  //  {visittime: "2019-06-04 14:05:58", visitid: "1", visitdoctor: "lobna jjjjjjjjjjjjjjjjjjjjjjjjjj", visitstatus: "Cancel", visittype: "type1"},
  //  {visittime: "2019-06-04 14:05:58", visitid: "8", visitdoctor: "lobna", visitstatus: "Comfirmed", visittype: "type1"},
  //  {visittime: "2019-06-03 21:32:29", visitid: "3", visitdoctor: "esraa maher abu daheb", visitstatus: "Draft", visittype: false},
  //  {visittime: "2019-05-28 13:14:53", visitid: "5", visitdoctor: "emo", visitstatus: "Done", visittype: "type2"}];
  //  for(let i=0;i<this.visits.length;i++){
  //          if(this.visits[i]["visitstatus"]=="Draft"){
  //            this.draftvisit.push(this.visits[i])
  //          }
  //          else if(this.visits[i]["visitstatus"]=="Comfirmed"){
  //            this.confirmedvisit.push(this.visits[i])
  //          }
  //          else if(this.visits[i]["visitstatus"]=="Done"){
  //            this.donevisit.push(this.visits[i])
  //          }
  //          else if(this.visits[i]["visitstatus"]=="Cancel"){
  //                       this.cancelvisits.push(this.visits[i])
  //                     }
  //        }
  //  console.log(this.visits)
  //  console.log(this.draftvisit)
  //  console.log(this.confirmedvisit)
  //  console.log(this.donevisit)
 
       }
   
   SignOut(){
     this.authservice.SignOut();
   }
   // to route to clinical sheet
   tohisclinicalsheet(id){
     this.router.navigate(['/side/home/dashboard/medicalsheet',id]);
   }
   // to cancel your trip
   async cancel(id){
   this.objid={
     id
   }

   Swal.fire({
    title: 'Are you sure you have canceled your reservation ?',
    text: "",
    type: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'

  }).then((result) => {

    if (result.value) {
      Swal.fire(
        'Deleted!',
        'Your visit has been deleted.',
        'success'
      )
      this.httpService.post<any>("http://172.16.2.28:8069/clinical_management_system/visit/status"
      ,JSON.stringify ( this.objid)).subscribe( async res=>{
     this.done=true 
       })
       this.canceled[id]=!this.canceled[id];

    }
 



  })
  //  alert("Are you sure you have canceled your reservation?")
  //  swal("Error","Are you sure you have canceled your reservation?", "error");

  }

}
