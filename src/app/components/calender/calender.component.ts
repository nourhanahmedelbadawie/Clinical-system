import { Component, OnInit } from '@angular/core';
import {NgbDateStruct, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.scss']
})


export class CalenderComponent implements OnInit {
  model: NgbDateStruct;
  date: {year: number, month: number};
  calenderdate={
    year:2018,
    day:14,
    month:8
  };
  apicheckdate={
    year:2018,
    day:14,
    month:8
  }
  apidate:string[];
  public convertobj={year:2016,
  month:1,
  day:1
  }
  arrCalenderData;
  arrayfady=[];
  public doctorName:string="Mohamed";
 
  constructor(private calendar: NgbCalendar,private httpService: HttpClient) { }

  ngOnInit() {
    this.httpService.get('../../../assets/data/calender_data.json').subscribe(
    
      data => {
        console.log(data[0]);
        console.log(data[1]);
        // this.arrCalenderData = JSON.parse(JSON.stringify(data));
        // debugger;
        this.apidate = data as string [];	 // FILL THE ARRAY WITH DATA.
          
        for(let i=0;i<this.apidate.length;i++){
          let item=this.apidate[i]["doctors"]
          console.log(item)
        for (let key of item) {
        
         console.log(key)
        }
       
        // console.log(this.apidate[i]["date"])
        console.log(this.apidate[i]["date"])
        this.arrCalenderData=JSON.stringify(this.convertdate(this.apidate[i]['date']))
          
          this.arrayfady.push(JSON.parse( this.arrCalenderData))
          console.log( this.arrayfady) 
         
        }
      },
      (err: HttpErrorResponse) => {
        console.log (err.message);
      }
      
    );  
     


  }
  selectToday(param) {
    this.model = this.calendar.getToday();  
    this.calenderdate.day=param.day;
     this.calenderdate.month=param.month;
     this.calenderdate.year=param.year;
     console.log("day", this.calenderdate.day);
     console.log( "month",this.calenderdate.month);
     console.log("year",this.calenderdate.year)
    console.log(param)
    for(let i=0;i<this.arrayfady.length;i++){
     
      if(this.arrayfady[i].day===this.calenderdate.day&&
        this.arrayfady[i].month===this.calenderdate.month&&
        this.arrayfady[i].year===this.calenderdate.year&&
         this.apidate[i]["doctors"]==="Mohamed"
        ){
        console.log("yessss")
        
      
        
      }else{
        console.log("noooooooo")
      }
      
    }
    let d=new Date(this.calenderdate.day,this.calenderdate.month,this.calenderdate.year)
    console.log(d)     
  }
   
  convertdate(param:string) {
    let datee=new Date(param);
    this.convertobj.month=datee.getMonth()+1;
    this.convertobj.day=datee.getDate();
    this.convertobj.year=datee.getFullYear()
    return this.convertobj;   
  }
 

}
