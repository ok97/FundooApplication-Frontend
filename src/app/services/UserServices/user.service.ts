import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpService } from '../HttpServices/http.service';
import { JwtHelperService } from "@auth0/angular-jwt";
@Injectable({
  providedIn: 'root'
})
export class UserService {
  helper = new JwtHelperService();
  constructor(private httpService : HttpService) { }

  registerUser(data: any){
    
    return this.httpService.post('api/Account/Register', data, null);
  }

  login(data: any){

    return this.httpService.post('api/Account/Login', data, null);
  }

  resetPassword(data: any){
    let headers = new HttpHeaders()
    .set('Authorization', 'Bearer '+localStorage.getItem('FunDooNotesJWT'));  
    let options = { headers: headers };
    return this.httpService.post('api/Account/Reset Password', data, options );
  }

  ForgetPassword(data: any){
    return this.httpService.post('api/Account/Forget Password', data, null );
  }

  authenticateUser(){
    const token = localStorage.getItem("FunDooNotesJWT")
    const isExpired = this.helper.isTokenExpired(token || undefined);
    return !isExpired;
  }

}
