import { Component, OnInit } from '@angular/core';
import { CalendarService } from 'src/app/service/calendar.service';

@Component({
  selector: 'app-calendardetail',
  templateUrl: './calendardetail.component.html',
  styleUrls: ['./calendardetail.component.scss']
})
export class CalendardetailComponent implements OnInit {

  constructor(private service:CalendarService) { }

  ngOnInit() {
    this.service.observabledate.subscribe((param) => {
      console.log(param);
      this.dateselected = param;
    })
  }
dateselected:{}






}
