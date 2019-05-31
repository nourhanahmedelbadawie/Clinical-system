import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {NgbDateStruct, NgbCalendar, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { CalendarService } from 'src/app/service/calendar.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CalendarComponent implements OnInit {
  markDisabled;

  model: NgbDateStruct;
  date: {year: number, month: number};
  constructor(private calendar: NgbCalendar,private service:CalendarService) { }

  ngOnInit() {
    this.markDisabled = (date: NgbDate) => {
      // this.calendar.getWeekday(date) >= 6
      // if the date is in array of disable_dates
      // return true
      // else return false
      return false
    };

    this.disapled_date()
  }
  selectToday() {
    this.model = this.calendar.getToday();
  }
//select
dateselect(e){
  console.log(this.date)
  console.log(this.model)
  this.service.datedisplay(this.model)

}
//get disabled date
disapled_date(){
  let items:any=window.document.getElementsByClassName("ngb-dp-day")

// Array.prototype.forEach.call(items,(element => {
 
//   console.log("ele",element) 

// })
// )
console.log("dddddddddddd")
for(let i;items.length;i++){
console.log(items[i])
}
console.log("dddddddddddd")

// for (let item of items) {
//   console.log("item",items);
//   item.setAttribute("disabled", true);
// }
}












}
