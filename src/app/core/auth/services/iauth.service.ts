import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environments';
import { jwtDecode } from "jwt-decode";
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class IauthService {
  private userData: any
  private data: any
  constructor(private http: HttpClient, private router: Router) { }
  register(data: object): Observable<any> {
    console.log('register')
    return this.http.post(`${environment.baseUrl}auth/signup`, data)
  }
  login(data: object): Observable<any> {
    console.log('login')
    return this.http.post(`${environment.baseUrl}auth/signin`, data)
  }
  verifyToken(): Observable<any> {
    return this.http.get(`${environment.baseUrl}auth/verifyToken`)
  }
  setLocalstorgeToken(token: string): void {
    try {
      if (typeof localStorage != 'undefined') {
        localStorage.setItem('token', token)
        this.userData = jwtDecode(localStorage.getItem('token')!);
        localStorage.setItem('id', this.userData.id)

        console.log(this.userData)
      }
    }
    catch { this.logoutfunc }
  }
  checkifuserExist(): string | null {
    console.log('checkifuserExist')
    if (typeof localStorage != 'undefined') {
      return localStorage.getItem('token')!
    }
    return null
  }
  logoutfunc(): void {
    console.log('logoutfunc')
    localStorage.removeItem('token');
    this.userData = null
    this.router.navigate(['/login'])
  }
}
