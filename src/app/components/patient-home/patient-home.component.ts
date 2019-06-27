import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../service/authservice.service';
import { AngularFireStorage } from 'angularfire2/storage';
import { NotificationService } from '../../service/notification.service';
import { MessagingServiceService } from '../../service/messaging-service.service';


@Component({
  selector: 'app-patient-home',
  templateUrl: './patient-home.component.html',
  styleUrls: ['./patient-home.component.scss']
})
export class PatientHomeComponent implements OnInit {
  count:number;
  isLoggedIn: boolean ;
  public downloadURL ;
  public userDataDatails;
  constructor( private router:Router,
    private httpService: HttpClient,
    public authservice:AuthService,
    private afStorage: AngularFireStorage,
    private notiService:NotificationService,
    private messageService:MessagingServiceService) {
   }
   news: string []; //news display to page
  ngOnInit() {
   
    // this.authservice.setredirecturl(this.router.url);
    // this.count=this.messageService.count;
      // notification part
  
      this.notiService.observableCount.subscribe((param) =>{
        debugger;
        console.log(param)
        this.count=param;
      })
   
    if (this.authservice.isAuthenticated()) {
      this.isLoggedIn = true;
       this.userDataDatails=JSON.parse(localStorage.getItem("userdetails"));
      this.downloadURL=this.afStorage.ref(this.userDataDatails[0].image).getDownloadURL();
    }
    else{
      this.isLoggedIn = false;
    }
   
 
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

  navigate(){
    this.authservice.setredirecturl(this.router.url)
    this.router.navigateByUrl('/side/signin')
  }
  navigate_1(){
    this.router.navigateByUrl('/side/signup')

  }
  gotonotification(){
     this.notiService.changeCount(0)

  }

  


}