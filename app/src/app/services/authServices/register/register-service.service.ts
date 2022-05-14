import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/app/donnees/User';

@Injectable({
  providedIn: 'root'
})
export class RegisterServiceService {
  baseUrl = "http://localhost:2000/user"
  constructor(private http: HttpClient) { }
  signup(data: any) {
    return this.http.post<any>(this.baseUrl+'/register',data).toPromise()

  }
}
