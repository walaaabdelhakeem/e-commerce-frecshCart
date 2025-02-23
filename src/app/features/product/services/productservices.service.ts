import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AnyMxRecord } from 'dns';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class ProductservicesService {

  constructor(private http:HttpClient) { }
  getproducts():Observable<any>{
    return this.http.get(`${environment.baseUrl}products`)
  }
  getproductdetails(id:string|null):Observable<any>{
    return this.http.get(`${environment.baseUrl}products/${id}`)
  }
}
