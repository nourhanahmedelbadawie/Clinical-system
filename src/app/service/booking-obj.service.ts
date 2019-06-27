import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpClient, HttpHeaders } from '@angular/common/http';
import { GuardCalSerService } from './guard-cal-ser.service';

//interface 
interface BE_booking_obj{
  doc_name:string;
  doc_id:number,
  doc_date:string;
  doc_time:string;
  pat_id:number;
}

@Injectable({
  providedIn: 'root'
})

export class BookingObjService {
  pat_id:any
  constructor( private httpService:HttpClient,private gaurdcal_ser:GuardCalSerService ) { }
       
backendbooking_obj={
  doc_name:"",
    doc_id:0,
    doc_date:"",
    doc_time:"",
    pat_id:0
}

getdata(myobj:object){
  this.backendbooking_obj.doc_name=myobj["doc_name"]
  this.backendbooking_obj.doc_id=myobj["doc_id"]
  this.backendbooking_obj.doc_date=myobj["doc_date"]

}
async   gettime(mytime:string){
this.backendbooking_obj.doc_time=mytime
this.pat_id=JSON.parse(localStorage.getItem('userdetails'))[0].id    
this.backendbooking_obj.pat_id=this.pat_id
console.log("test booking",  this.backendbooking_obj)
await    localStorage.setItem('booking_date_object', JSON.stringify(this.backendbooking_obj));



 
}
}
