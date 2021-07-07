import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './components/Pages/signup/signup.component';
import { LoginComponent } from './components/Pages/login/login.component';
import { ForgetPasswordComponent } from './components/Pages/forget-password/forget-password.component';
import { ResetPasswordComponent } from './components/Pages/reset-password/reset-password.component';
import { DashboardComponent } from './components/Pages/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: 'signup', component: SignupComponent, pathMatch: 'full'
  },
  { path : 'login', component: LoginComponent, pathMatch: 'full', },
  { path : 'ForgetPassword', component: ForgetPasswordComponent},
  { path : 'ResetPassword/:token', component: ResetPasswordComponent},
  
  {
    path: 'Dashboard', component: DashboardComponent
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  snapshot: any; 

}
