import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/authservice.service';
import { UsersService } from '../../service/users.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public user;
  public userDataDatails={};
  
  
    constructor(public authservice:AuthService,private userData:UsersService) { 
    }
  
    ngOnInit() {
      this.userDataDatails=this.userData.getUserData()
      console.log( this.userDataDatails[0].phoneNumber);
      
        }
    SignOut(){
      this.authservice.SignOut();
    }
  

}
