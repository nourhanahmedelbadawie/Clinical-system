import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/authservice.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss']
})
export class VerifyEmailComponent implements OnInit {
  public user;
  constructor(public authservice:AuthService) { 
    this.user=this.authservice.userData;
    console.log(this.user)
  }
  ngOnInit() {
  }
  SendVerificationMail(){
    this.authservice.SendVerificationMail();
  }

}
