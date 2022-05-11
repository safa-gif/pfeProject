import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  baseUrl = "http://localhost:2000/user";
  // headers = new HttpHeaders().set('Content-Type', 'application/json');
  // currentUser = {};
  constructor(private http: HttpClient) {
    
   }
   login(data:any) {
     return this.http.post<any>(this.baseUrl+'/login', data).toPromise()
   }
}
