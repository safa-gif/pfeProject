import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, catchError} from 'rxjs/operators';
import {throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DateServiceService {
   baseUrl = 'http://localhost:2000/events/';
  constructor(
    private http: HttpClient,
    public router: Router,
  ) { }
  // Add Event to Calender//
  addEvent(event: any) {
    return this.http.post(this.baseUrl + 'add_events', event);
  }

   // Get All Events //
  getAllEvents() {
    return this.http.get(this.baseUrl + 'get_events').
      pipe(
        map((data: any) => {
          console.log(data);
          return data;
        }), catchError(error => {
          return error
        })
      );
  }
  // Delete Single Event//
  deleteSingleEvent(id: string) {
    return this.http.delete(this.baseUrl + 'delete_event/' + id).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return error
        })
      );
  }
  totalEvents() {
   return this.http.get(this.baseUrl+'total_events')
  }
  // modifyEvent(id:string){
  //   return this.http.put(this.baseUrl+'modify_event',id)
  //   .pipe(map((data: any) => {
  //     return data;
  //   }),
  //   catchError(error => {
  //     return error
  //   }))
  // }

}

  
 
