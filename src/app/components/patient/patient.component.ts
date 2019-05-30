import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss']
})
export class PatientComponent implements OnInit {

doctors:string[]
rates_array:any[]=[]
opsite_rates_array:any[]=[]
 filterdoctor(){
  console.log("onkey up")
  }
  constructor(private httpService:HttpClient ) {
    this.screenhgt=screen.height
    console.log(this.screenhgt)
   }
screenhgt:any
  ngOnInit() {

   let This=this
  this.httpService.get('./assets/data/doctors.json').subscribe(
    data => {
      this.doctors = data as string [];	 // FILL THE ARRAY WITH DATA.
      this.doctors.forEach(function(doctor:any){
        let len:number=parseInt(doctor.rate)
        var array = new Array(len)
        This.rates_array.push(array as any)
        This.opsite_rates_array.push(new Array(5-parseInt(doctor.rate)))
      })
    
      console.log("this rates => ",this.opsite_rates_array)


 
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
  console.log(doctor)
}


}
