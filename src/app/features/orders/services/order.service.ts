import { HttpClient } from '@angular/common/http';
import { Injectable, signal, WritableSignal } from '@angular/core';
import { environment } from '../../../../environments/environments';
import { IauthService } from '../../../core/auth/services/iauth.service';
import { Observable } from 'rxjs';
import { jwtDecode } from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient, private httpservice: IauthService) { }
  Checkoutsession(id: string | null, shippingAddress: { details: string, phone: string, city: string }): Observable<any> {
    const baseurl = `?url=${encodeURIComponent('https://e-commerce-frecsh-cart.vercel.app/#')}`;
    return this.http.post(`${environment.baseUrl}orders/checkout-session/${id}` + baseurl, shippingAddress)
  }
  getuserorder(): Observable<any> {
    let userdata
    if (typeof localStorage != 'undefined') {
      userdata = localStorage.getItem('id')!;
    } return this.http.get(`${environment.baseUrl}orders/user/${userdata}`)

  }
}
