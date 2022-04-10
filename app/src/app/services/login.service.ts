import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  baseUrl = "http://localhost:2000/user/username";
  constructor(private http: HttpClient) {
    
   }
}
