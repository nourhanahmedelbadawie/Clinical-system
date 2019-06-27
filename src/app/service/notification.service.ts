import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor() { }
  public subjectCount =new BehaviorSubject(0);
  observableCount=this.subjectCount.asObservable();
  changeCount(value){
    debugger
    
    this.subjectCount.next(value);
    
  }
}
