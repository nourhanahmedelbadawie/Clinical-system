import { Component, OnInit } from '@angular/core';
 import { HttpErrorResponse, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss']
})
export class PatientComponent implements OnInit {

doctors:string[]

  constructor(private httpService: HttpClient) { }

  ngOnInit() {

      
  this.httpService.get('./assets/data/doctors.json').subscribe(
    data => {
      this.doctors = data as string [];	 // FILL THE ARRAY WITH DATA.
       console.log("this.news[1])",this.doctors[1]);
    },
    (err: HttpErrorResponse) => {
      console.log (err.message);
    }
  );

}
  
//rating on doctor




}
