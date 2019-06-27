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
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { PatientHomeComponent } from './components/patient-home/patient-home.component';
import { PatientComponent } from './components/patient/patient.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { HttpClientModule } from '@angular/common/http';
import { FilterPipe } from './filter.pipe';
import { CalendarComponent } from './components/calendar/calendar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CalendardetailComponent } from './components/calendardetail/calendardetail.component';
import { environment } from '../environments/environment' ;
import { AuthService } from './service/authservice.service';
 import { AngularFireStorageModule } from '@angular/fire/storage/storage.module';
import { AsyncPipe } from '../../node_modules/@angular/common';
import { MessagingServiceService } from './service/messaging-service.service';
import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { PageNotFoundComponentComponent } from './components/page-not-found-component/page-not-found-component.component';
import { MustMatchDirectiveDirective } from './service/must-match-directive.directive';
import { MedicalSheetComponent } from './components/medical-sheet/medical-sheet.component';
import { CalendarService } from './service/calendar.service';
import { BookingObjService } from './service/booking-obj.service';
import { NotificationComponent } from './components/notification/notification.component';
import { ModelComponent } from './components/model/model.component';
import { BsModalService, ModalModule } from 'ngx-bootstrap/modal';
import { ReversePipe } from './reverse.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ModelComponent,
    SignUpComponent,
    SignInComponent,
    SuccessComponent,
    DashboardComponent,
    ForgetPasswordComponent,
    VerifyEmailComponent,
    PatientHomeComponent,
    PatientComponent,
    FilterPipe,
    CalendarComponent,
    CalendardetailComponent,
    PageNotFoundComponentComponent,
    MustMatchDirectiveDirective,
    SidebarComponent,
    MedicalSheetComponent,
    NotificationComponent,
    ReversePipe

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    HttpClientModule ,
    NgbModule,
     AngularFireStorageModule,
    AngularFireMessagingModule,
    ModalModule.forRoot()
  ],
  entryComponents:[
    ModelComponent
  ],
  providers: [AuthService,AngularFireDatabase,AsyncPipe,MessagingServiceService,CalendarService,BookingObjService,BsModalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
