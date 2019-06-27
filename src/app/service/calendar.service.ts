import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  constructor() { }
  dateselected_ser:{}


  //display date
  public date =new BehaviorSubject(0);
  observabledate=this.date.asObservable();
  datedisplay(value){
    this.date.next(value);
  }

  //display appointement
  public app =new BehaviorSubject(0);
  observableapp=this.app.asObservable();
  appoint_display(value){
    console.log("value",value)
    this.app.next(value);
  }
//take doctor
mydoc:{}
selectDoctor(item){
this.mydoc=item
}
 

}
 