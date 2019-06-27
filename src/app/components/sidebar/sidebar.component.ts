import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/service/authservice.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @ViewChild('menu') el:ElementRef;

  constructor(public authservice:AuthService,private _router: Router) { }
  show:boolean
  ngOnInit() {

    if (this.authservice.isAuthenticated()){
 
      this.show=true
    }else{
      this.show=false
    }
  }
  //=============in responsive=================
  displaymenu(){
    if( document.getElementById("mobnav").style.display=="block"){
      document.getElementById("mobnav").style.display="none"

    }else{
      document.getElementById("mobnav").style.display="block"   
    }
  }



  ///========================================
  navigate(){
    if (this.authservice.isAuthenticated()){
 
       
    this._router.navigate(['/side/home/dashboard'])
    }
  }
  SignOut(){
    this.authservice.SignOut();
    this.show=false
  }







}
