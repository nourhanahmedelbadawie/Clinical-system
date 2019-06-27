import { Component, OnInit, } from '@angular/core';
import { HttpErrorResponse, HttpClient, HttpHeaders } from '@angular/common/http';
import { CalendarService } from 'src/app/service/calendar.service';
import { ActivatedRoute, Router } from '@angular/router';
import { GuardCalSerService } from 'src/app/service/guard-cal-ser.service';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss']
})
export class PatientComponent implements OnInit {
  public searchText
  loading = true


doctors:string[]
rates_array:any[]=[]
opsite_rates_array:any[]=[]

backend={name:"test"}
 filterdoctor(){
  console.log("onkey up")
  }
  constructor(private httpService:HttpClient ,
    private calserv:CalendarService,
    private _route: ActivatedRoute,
              private _router: Router,
             private calguard_ser:GuardCalSerService
              ) {
    this.screenhgt=screen.height
    console.log(this.screenhgt)

   }
screenhgt:any 
private  httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Accept': 'application/json'
    // 'Authorization': 'my-auth-token'
  }),

};
  ngOnInit() {

//testing backend ===================================================

    // this.httpService.post<any>("http://172.16.2.28:8069/clinical_management_system/schedule_visit/"
    // ,JSON.stringify({name:"nourhan"}),this.httpOptions).subscribe(res=>{
    //   console.log("res 22",res)
    // })

// this.httpService.get("http://172.16.2.28:8069/clinical_management_system/patient?patient_id=1").subscribe(res=>{
//   console.log("res55",res)
 
// })
  
  // data doctor= http://172.16.2.28:8069/clinical_management_system/patient?patient_id=5

    // data doctor= http://172.16.7.56:8069/clinical_management_system/doctors
    // './assets/data/doctors.json'
    //========================================================================


   let This=this
  this.httpService.get('http://172.16.2.28:8069/clinical_management_system/doctors/').subscribe(
    data => {
      this.loading = false //animation


      this.doctors = data as string [];	
      console.log(data)          // FILL THE ARRAY WITH DATA.
      this.doctors.forEach(function(doctor:any){
        let len:number=parseInt(doctor.rate)
        var array = new Array(len)
        This.rates_array.push(array as any)
        doctor.fullrate= This.rates_array
       
        This.opsite_rates_array.push(new Array(5-parseInt(doctor.rate)))
        doctor.opsrat=This.opsite_rates_array
        console.log("doctor.rate",doctor.fullrate)
        console.log("doctor.rate", doctor.opsrat)
       
      })
     

  


      console.log("this rates => ",this.rates_array)


 
    },
    (err: HttpErrorResponse) => {
      console.log (err.message);
    }

    
  );



    

}




//rating on doctor

  stars: any[]=[{ id: 1 ,isClicked:false},
    { id: 2 ,isClicked:false},
    { id: 3 ,isClicked:false},
    { id: 4 ,isClicked:false},
    { id: 5 ,isClicked:false}]

  
checkRates(item,doctor){
  debugger
if(item.isClicked==true){

  return
}
doctor.rate=item.id

  this.fullstar(item)
 }
    fullstar(star){
      for(let i=0;i<star.id;i++){
        this.stars[i].isClicked = true;
        }
    }
    
//     removerate(item,doctor){
// if(this.stars[item.id].isClicked!==true){
//   item.isClicked=false;
//   doctor.rate=doctor.rate-1;
// }
// else{

// //remove the rest full classes
// doctor.rate=item.id
// for(let i=item.id;i<this.stars.length;i++){
//   console.log(this.stars[i])
//   this.stars[i].isClicked=false;

// }
// console.log("remove doctor",doctor)

// }





//     }
//select doctor
selectdoctor(doctor){
  this._router.navigate(['side/patient/calendar',doctor.id])
  this.calserv.selectDoctor(doctor)
 this.calguard_ser.select_btnclicked=true 
}


}
