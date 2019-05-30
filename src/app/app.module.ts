import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SuccessComponent } from './components/success/success.component';
import { SignInComponent } from './components/auth/sign-in/sign-in.component';
import { SignUpComponent } from './components/auth/sign-up/sign-up.component';
import { FormsModule } from '@angular/forms';
import { MainComponent } from './components/main/main.component';
import {CalenderComponent} from './components/calender/calender.component';
import { PatientHomeComponent } from './components/patient-home/patient-home.component';
import { PatientComponent } from './components/patient/patient.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
// import { CalenderComponent} from './components/calender/calender.component'

import { environment } from '../environments/environment' ;
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './service/authservice.service';
@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    SignInComponent,
    SuccessComponent,
    DashboardComponent,
    ForgetPasswordComponent,
    VerifyEmailComponent,
    MainComponent,
    PatientHomeComponent,
    PatientComponent,
    CalenderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    NgbModule,
    HttpClientModule,
  ],
  providers: [AuthService,AngularFireDatabase],
  bootstrap: [AppComponent]
})
export class AppModule { }
