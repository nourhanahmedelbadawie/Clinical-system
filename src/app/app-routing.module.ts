import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PatientHomeComponent } from './components/patient-home/patient-home.component';
import { PatientComponent } from './components/patient/patient.component';
import { SignUpComponent } from './components/auth/sign-up/sign-up.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { SignInComponent } from './components/auth/sign-in/sign-in.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { PageNotFoundComponentComponent } from './components/page-not-found-component/page-not-found-component.component';
import { AuthguardService } from './service/authguard.service';
import { SuccessComponent } from './components/success/success.component';
import { UpService } from './service/signin/up.service';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { GuardCalSerService as calGuard } from './service/guard-cal-ser.service';
import { MedicalSheetComponent } from './components/medical-sheet/medical-sheet.component';
import { NotificationComponent } from './components/notification/notification.component';

const routes: Routes = [
  
    {path:'',redirectTo:'home',pathMatch:'full'},
    {path:'medicalsheet/:id',component:MedicalSheetComponent,canActivate:[AuthguardService] },
   {path:'home',component:PatientHomeComponent},
   {path:'success',component:SuccessComponent,canActivate:[AuthguardService]},  
      // {path: 'signup',component: SignUpComponent,canActivate:[UpService] },
    // { path: 'home/dashboard', component: DashboardComponent,canActivate:[AuthguardService] },
    { path: 'forgot-password', component: ForgetPasswordComponent },
    { path: 'verify-email-address', component: VerifyEmailComponent },
    // { path: 'signin', component: SignInComponent,canActivate:[UpService]},
    // {path:'calendar/:id',component:CalendarComponent},
    // {path:'home/patient',component:PatientComponent},
  //  { path: '**', component: PageNotFoundComponentComponent },
  
];
const childroutes: Routes=[
  {
    path:'side',component:SidebarComponent,children:[
    
    {path:'',redirectTo:'home',pathMatch:'full'},
    {path:'patient',component:PatientComponent}, 
       {path:'patient/calendar/:id',component:CalendarComponent},
       { path: 'home/dashboard', component: DashboardComponent,canActivate:[AuthguardService] },
       {path:'home/dashboard/medicalsheet/:id',component:MedicalSheetComponent,canActivate:[AuthguardService] },
       {path:'home/notification',component:NotificationComponent,canActivate:[AuthguardService]},
       { path: 'signin', component: SignInComponent,canActivate:[UpService]},
       {path: 'signup',component: SignUpComponent,canActivate:[UpService] }

  
  
  ]},
  { path: '**', component: PageNotFoundComponentComponent }]

@NgModule({
  imports: [RouterModule.forRoot(routes),
    RouterModule.forChild(childroutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
