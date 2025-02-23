import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class BrandsService {

   constructor(private http:HttpClient) { }
    gelallhomeBrands():Observable<any>{
     return this.http.get(`${environment.baseUrl}brands`)
    }
    gelallhomespacificBrands(id:string):Observable<any>{
     return this.http.get(`${environment.baseUrl}brands/${id}`)
    }
}
