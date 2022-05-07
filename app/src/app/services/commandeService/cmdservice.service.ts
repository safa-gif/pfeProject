import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { map, catchError} from 'rxjs/operators';
import {throwError } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class CmdserviceService {

  constructor( private service :HttpClient,
    public router: Router) { }
  baseUrl = "http://localhost:2000/cmd";
  // headers = new HttpHeaders().set('Content-Type', 'application/json');
  // currentUser = {};
  getAllData() {
    return this.service.get(this.baseUrl)
    .pipe(
      map((data: any)=>{
        console.log(data);
        return (data)
      }),
      catchError((error)=> {
        return error
      })
    )
  }
   
}
