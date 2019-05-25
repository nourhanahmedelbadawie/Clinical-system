import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { PatientHomeComponent } from './components/patient-home/patient-home.component';
import { PatientComponent } from './components/patient/patient.component';
import { SignUpComponent } from './components/auth/sign-up/sign-up.component';
import { SuccessComponent } from './components/success/success.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { SignInComponent } from './components/auth/sign-in/sign-in.component';
const routes: Routes = [
  {
    path:'main',loadChildren:'',component:MainComponent}
    ,{path:'',redirectTo:'main',pathMatch:'full'},
    {path:'home',component:PatientHomeComponent} ,
    {path:'patient',component:PatientComponent},
    {path: 'signup',component: SignUpComponent },
    {path: 'success',component: SuccessComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'forgot-password', component: ForgetPasswordComponent },
    { path: 'verify-email-address', component: VerifyEmailComponent },
    { path: 'signin', component: SignInComponent},
];




@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }