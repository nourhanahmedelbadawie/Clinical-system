import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/authservice.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public user;
  constructor(public authservice:AuthService) { 
    this.user=this.authservice.userData;
    console.log(this.user)
  }

  ngOnInit() {
  }
  SignOut(){
    this.authservice.SignOut();
  }

}
