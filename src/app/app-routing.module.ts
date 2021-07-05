import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgetpasswordComponent } from './Component/Pages/forgetpassword/forgetpassword.component';
import { LoginComponent } from './Component/Pages/login/login.component';
import { ResetpasswordComponent } from './Component/Pages/resetpassword/resetpassword.component';
import { SignupComponent } from './Component/Pages/signup/signup.component';

const routes: Routes = [{path:'signup',component:SignupComponent},
                        {path:'login',component:LoginComponent},
                      {path:'forgetpassword',component:ForgetpasswordComponent},
                    {path:'resetpassword',component:ResetpasswordComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
