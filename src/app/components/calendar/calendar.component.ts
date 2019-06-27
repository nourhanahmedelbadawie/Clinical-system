import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbDateStruct, NgbCalendar, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { CalendarService } from 'src/app/service/calendar.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BookingObjService } from 'src/app/service/booking-obj.service';




@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CalendarComponent implements OnInit {
loading:boolean=true

  booking_obj={
    doc_name:"",
    doc_id:0,
    doc_date:"",
   
  }
  
  apidate: string[];
  freedate=[]
  datearr: [] = []
  arrCalenderData;
  alldoc_date:any
  alldoc_datestring:any
  // doctorselected:{}={
  //   name:"none",
  //   id:0
  // }
  doctorselected:any;
  mydocname:any
  model: NgbDateStruct;
  date: { year: number, month: number };
  selectedAppointments:any;
  constructor(private calendar: NgbCalendar, private service: CalendarService,
     private httpService: HttpClient,
     private bookingser:BookingObjService) { }


    
  ngOnInit() {
   this.getstart()    
//get my doctor

this.doctorselected= this.service.mydoc  
this.booking_obj.doc_name= this.doctorselected.name
this.booking_obj.doc_id=this.doctorselected.id
//  console.log("name",this.booking_obj.doc_id) 
console.log("doctor selected in patient component",this.doctorselected)


   
    
    //check of data 
    // ./assets/data/calender_data.json
    this.httpService.get('http://172.16.2.28:8069/clinical_management_system/get_empty_slots/').subscribe(

      data => {
    //  debugger
        this.apidate = data as string[];	 // FILL THE ARRAY WITH DATA.
        for (let i = 0; i < this.apidate.length; i++) {
          let item = this.apidate[i]["doctors"]
          // debugger
  for(let j=0;j<item.length;j++){

    if(item[j].id==this.doctorselected.id){
 
    // console.log("====================id",this.apidate[i]['doctors'][j].id)

         
          this.arrCalenderData = JSON.stringify(this.convertdate(  this.apidate[i]['date']))
       

          this.freedate.push(JSON.parse(this.arrCalenderData))

this.alldoc_datestring=JSON.stringify(this.apidate[i]['doctors'][j])
this.alldoc_date=JSON.parse(this.alldoc_datestring)
          // ======================================================

   
}
      }
        }
       
        this.detdisabled(this.freedate)    //to disable date


        this.loading = false //animation

      },
      (err: HttpErrorResponse) => {
        console.log(err.message);
      }

    );

  }


  //date selected to detailedview and check of selected date
            
  dateselect(param) {
    
    this.service.datedisplay(this.model)               
    this.booking_obj.doc_date= `${param.month}/${param.day}/${param.year}`
    // console.log("this.booking_obj.doc_date",this.booking_obj.doc_date)
    this.bookingser.getdata(this.booking_obj)
    this.model = this.calendar.getToday();
    this.calenderdate.day = param.day;
    this.calenderdate.month = param.month;
    this.calenderdate.year = param.year;

    
    for (let i = 0; i < this.freedate.length; i++) {



  
      if (this.freedate[i].day === this.calenderdate.day &&
        this.freedate[i].month === this.calenderdate.month &&
        this.freedate[i].year === this.calenderdate.year 
    
      ) {
  //  console.log("///////////////////////=========================== error appointements",this.apidate[i] )


this.getdoctorlist(this.alldoc_date)
      } else {
       console.log("?????????????????????????????????/not done")

      }

    }
    let d = new Date(this.calenderdate.day, this.calenderdate.month, this.calenderdate.year)
    


  }

  //get data of calender_data

  calenderdate = {
    year: 2018,
    day: 14,
    month: 8
  };
  apicheckdate = {
    year: 2018,
    day: 14,
    month: 8
  }

  public convertobj = {
    year: 2016,
    month: 1,
    day: 1
  }



  convertdate(param: string) {
    let datee = new Date(param);
    this.convertobj.month = datee.getMonth() + 1;
    this.convertobj.day = datee.getDate();
    this.convertobj.year = datee.getFullYear()
    return this.convertobj;
  }

  ///disable date

  isDisabled: any

  detdisabled(arr) {

    debugger
 

      this.isDisabled = (date: NgbDate, current: { month: number }) => {
        return this.isDisabledCheck(arr,date,current)
       
      };

  }


  isDisabledCheck(arr,date,current){
   
    for (let i = 0; i < arr.length; i++) {
      if (date && date.day == arr[i].day && date.month == arr[i].month) {
        return false
      }
    }
    return true
    
  }

//get list of doctor in selected date
getdoctorlist(obj){
 
  console.log("///////////////////////=========================== done appointments",obj.appointments)
  // debugger
  this.selectedAppointments= obj.appointments;  
  console.log("///////////////////////=========================== done selectedAppointments",this.selectedAppointments)
  this.service.appoint_display(obj.appointments)
    

  // for(let i=0;i<obj.doctors.length;i++){
  //   console.log("///////////////////////=========================== done appintements",obj.doctors[i].appointments)
  //   debugger
  //   if( obj.doctors[i].id==this.doctorselected.id){
  //      console.log("///////////////////////=========================== done appintements",obj.doctors[i].appointments)
  //     this.service.appoint_display(obj.doctors[i].appointments)
  //   }
  //   else{
  //     console.log("///////////////////////=========================== error appointements",obj.doctors[i].appointments)

  //     console.log("===========Error id",obj.doctors[i].id)

  //   }
  // }
}
// getdocdate(arr){
//   for(let i=0;i<arr.length      )

//   console.log("agg",arr)
//   return this.apidate[1]['date']
// }


getstart(){
  
  this.alldoc_date={}
  this.alldoc_datestring=""
  
  this.booking_obj={
    doc_name:"",
    doc_id:0,
    doc_date:"",
   
  }

  this.apidate=[""]
  this.freedate=[]
  this.datearr= []
  this.arrCalenderData;
  this.doctorselected={
    name:"none",
    id:0
  }
 this.mydocname=""

console.log("  this.booking_obj",  this.alldoc_date)

return
}











}
