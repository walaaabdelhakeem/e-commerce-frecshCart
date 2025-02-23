import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environments';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomecatpgeriesService {

  constructor(private http:HttpClient) { }
  gelallhomecategoery():Observable<any>{
   return this.http.get(`${environment.baseUrl}categories`)
  }
  gelallhomespacificcategoery(id:string):Observable<any>{
   return this.http.get(`${environment.baseUrl}categories/${id}`)
  }
}
