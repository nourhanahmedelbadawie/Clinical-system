import { Component, OnInit, HostListener, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

import { HttpErrorResponse, HttpClient } from '@angular/common/http';
declare var $: any;

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
 
//chang color while scrolling
$(document).scroll(function () {
  var $nav = $(".navbar-fixed-top");
  $nav.toggleClass('scrolled', $(this).scrollTop() > $nav.height());
});
//getting news data
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