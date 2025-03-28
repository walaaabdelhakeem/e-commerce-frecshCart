import { HttpClient } from '@angular/common/http';
import { Injectable, signal, WritableSignal } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../../environments/environments';
import { IauthService } from '../../../core/auth/services/iauth.service';

@Injectable({
  providedIn: 'root'
})
export class CartservicesService {
  // counter:BehaviorSubject<number>=new BehaviorSubject(0)
counter:WritableSignal<number>=signal(0)
  constructor(private httpClient: HttpClient, private httpservice: IauthService) { }

  addTOCart(productId: string):Observable<any> {
    return this.httpClient.post(`${environment.baseUrl}cart`, { productId } )
  }

  updateQuantityOfCart(productId: string,count:number):Observable<any> {
    return this.httpClient.put(`${environment.baseUrl}cart/${productId}`, {count}  )
  }

  getLoggeduse():Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}cart` )
  }

  removespecificcartItem(productId: string):Observable<any> {
    return this.httpClient.delete(`${environment.baseUrl}cart/${productId}`  )
  }

  Clearusercart():Observable<any> {
    return this.httpClient.delete(`${environment.baseUrl}cart/`)
  }
}
