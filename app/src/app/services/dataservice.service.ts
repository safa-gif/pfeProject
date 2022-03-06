import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DataserviceService {

  constructor(private http: HttpClient) { }

   //allows the connection between frontend and backend
    apiURL = "http://localhost:2000/api/data";

    //retrive data from database
    getAllData():Observable<any> 
    {
      return this.http.get(`${this.apiURL}`)   ;
    }

}
