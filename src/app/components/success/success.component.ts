import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse, HttpClient, HttpHeaders } from '@angular/common/http';

import * as $ from 'jquery';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss']
})
export class SuccessComponent implements OnInit {

  constructor( private httpService:HttpClient) { }

  ngOnInit() {
    this.getsend_bkbooking_obj()
  }


  send_bkbooking_obj:{}

  getsend_bkbooking_obj(){
this.send_bkbooking_obj=localStorage.getItem('booking_date_object')
this.httpService.post<any>("http://172.16.2.28:8069/clinical_management_system/schedule_visit/"
,this.send_bkbooking_obj).subscribe((res)=>{
  console.log("backend test", res)
  localStorage.removeItem('booking_date_object')
})
  }
  }
 
