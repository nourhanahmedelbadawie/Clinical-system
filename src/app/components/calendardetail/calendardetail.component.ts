import { Component, OnInit, Input, DoCheck } from '@angular/core';
import { CalendarService } from 'src/app/service/calendar.service';
import { BookingObjService } from 'src/app/service/booking-obj.service';
import { AuthService } from 'src/app/service/authservice.service';
import { Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ModelComponent } from 'src/app/components/model/model.component';
@Component({
  selector: 'app-calendardetail',
  templateUrl: './calendardetail.component.html',
  styleUrls: ['./calendardetail.component.scss']
})
export class CalendardetailComponent implements OnInit,DoCheck {
 appdisplay:any
 dateselected:any
 mydoc:any;
 destroy:any
 show:boolean

@Input() doctor:any;
@Input() doctorAppointments:any;



  ngDoCheck() {
   
    //date display

    this.service.observabledate.subscribe((param) => {
      console.log(param);
      this.dateselected = param;

    })
//doctor selected
this.mydoc=this.service.mydoc
    //display appointement
    this.service.observableapp.subscribe((param) => {
      console.log("appdisplay",param);
      this.appdisplay = param;
      this.destroy=this.appdisplay.lengh
    }) 
   
    


  }

  constructor(private modalService: BsModalService,private service:CalendarService
    , private bookser:BookingObjService,
    public authservice:AuthService,private _router: Router) { 

    }

    ngOnDestroy() {
      for (let i=0;this.appdisplay.lenght;i++){

        // document.getElementById(`${i}`).innerHTML="no response"



      }



    }


// ========================Modal=======================
bsModalRef: BsModalRef
openModalWithComponent() {
  const initialState = {
    list: [
      ``,
      'you must be registered first',
    
      ''
    ],
    title: 'Log in'
  };
  this.bsModalRef = this.modalService.show(ModelComponent, {initialState});
  this.bsModalRef.content.closeBtnName = 'Close';
  localStorage.setItem('cal_url', this._router.url);

}
// ====================================================
  ngOnInit() {
  
    // ================== for Model show==================
    if (this.authservice.isAuthenticated()){
 
      this.show=false
    }else{
      this.show=true
    }
  }

//to booking object in backend
showauthBook(i){



  //===========
  this.bookser.gettime(i)

    this._router.navigate(['/success']);
  
 


}






}
