  import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  constructor() { }
  dateselected_ser:{}


  //display date
  public dataCount =new BehaviorSubject(0);
  observabledate=this.dataCount.asObservable();
  datedisplay(value){
    this.dataCount.next(value);
  }
}
 