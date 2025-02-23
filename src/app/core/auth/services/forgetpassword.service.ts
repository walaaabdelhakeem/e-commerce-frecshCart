import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environments';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ForgetpasswordService {

  constructor(private http:HttpClient) { }
  forgotPassword(email:object):Observable<any>{
    return this.http.post(`${environment.baseUrl}auth/forgotPasswords`,email)
  }
  verifyResetCode(resetCode:object):Observable<any>{
    return this.http.post(`${environment.baseUrl}auth/verifyResetCode`,resetCode)
  }
  resetPassword(email:object):Observable<any>{
    return this.http.put(`${environment.baseUrl}auth/resetPassword`,email)
  }
}
