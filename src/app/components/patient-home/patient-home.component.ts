import { Component, OnInit } from '@angular/core';

import { HttpErrorResponse, HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-patient-home',
  templateUrl: './patient-home.component.html',
  styleUrls: ['./patient-home.component.scss']
})
export class PatientHomeComponent implements OnInit {

  constructor(     private httpService: HttpClient) {
   }
   news: string []; //news display to page
  ngOnInit() {
  
  this.httpService.get('./assets/data/news.json').subscribe(
      data => {
        this.news = data as string [];	 // FILL THE ARRAY WITH DATA.
         console.log("this.news[1])",this.news[1]);
      },
      (err: HttpErrorResponse) => {
        console.log (err.message);
      }
    );
  
  }
  bookclick(){
    console.log("click")
  }
}
