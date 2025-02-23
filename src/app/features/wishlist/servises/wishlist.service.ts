import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environments';
import { IauthService } from '../../../core/auth/services/iauth.service';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
 constructor(private httpClient: HttpClient) { }

  addTOwishlist(productId: string):Observable<any> {
    return this.httpClient.post(`${environment.baseUrl}wishlist`, { productId } )
  }

  getLoggedusewishlist():Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}wishlist` )
  }

  removespecificwishlistItem(productId: string):Observable<any> {
    return this.httpClient.delete(`${environment.baseUrl}wishlist/${productId}`  )
  }

}
