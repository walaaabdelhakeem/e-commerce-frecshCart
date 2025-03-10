import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environments';
import { IauthService } from '../../../core/auth/services/iauth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient, private httpservice: IauthService) { }
  Checkoutsession(id: string | null, shippingAddress: { details: string, phone: string, city: string }): Observable<any> {
    const baseurl = encodeURIComponent('?url=https://finalproject-2.vercel.app/#')
    return this.http.post(`${environment.baseUrl}orders/checkout-session/${id}` + baseurl, shippingAddress)
  }
}
