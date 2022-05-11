import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError, map, catchError } from 'rxjs';
import { TableDItem } from 'src/app/components/tables/table-d/table-d-datasource';

@Injectable({
  providedIn: 'root'
})
export class CmdserviceService {

  constructor( private service :HttpClient) { }
  baseUrl = "http://localhost:2000/cmd";
  // headers = new HttpHeaders().set('Content-Type', 'application/json');
  // currentUser = {};
  Counter() {
    return this.service.get(this.baseUrl+'/totalCmds')
  }
  getAll(): Observable<TableDItem[]> {
    return this.service.get<TableDItem[]>(this.baseUrl);
    // .pipe(map((data: any)=>{
    //   console.log(data)
    //   return (data)
    // }),
    // catchError((error)=> 
    //  {
    //   return (error)
    //  })
    // )
  }
  totalCommandes() {
  return this.service.get(this.baseUrl+'/total')
  }
  totalcmdAnnee() {
     return this.service.get(this.baseUrl+'/totalByYear')
  }

   
}
