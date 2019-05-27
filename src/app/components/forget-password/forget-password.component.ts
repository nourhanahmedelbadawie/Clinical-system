import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/authservice.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {

  constructor(public authservice:AuthService) { }

  ngOnInit() {
  }
  ForgotPassword(passwordResetEmail){
    this.authservice.ForgotPassword(passwordResetEmail.value)
    console.log(passwordResetEmail.value)
  }

}
