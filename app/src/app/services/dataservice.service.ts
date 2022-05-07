import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DataItem } from '../components/data/data-datasource';
import {SortDirection} from '@angular/material/sort';
@Injectable({
  providedIn: 'root'
})
export class DataserviceService {

  constructor(private http: HttpClient) { }

   //allows the connection between frontend and backend
    apiURL = "http://localhost:2000/data";

    //retrive data from database
    getAllData():Observable<DataItem []> 
    {
      return this.http.get<DataItem[]>(this.apiURL);
    }
    // baseURL = "http://localhost:2000/dim"
    // getAll(){
    //   return this.http.get(this.baseURl)
    // }
}
