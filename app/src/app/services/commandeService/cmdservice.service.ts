import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError, map, catchError } from 'rxjs'
import { Commande } from 'src/app/donnees/Commande';

@Injectable({
  providedIn: 'root'
})
export class CmdserviceService {

  constructor( private service :HttpClient) { }
  baseUrl = "http://localhost:2000/cmd";
 
  Counter() {
    return this.service.get(this.baseUrl+'/totalCmds')
  }
 
  // retrieve(): Observable<Commande[]> {
  //   return this.service.get<Commande[]>(this.baseUrl);
  // }
  retrieve(){
      return this.service.get(this.baseUrl);
     }
  totalCommandes() {
  return this.service.get(this.baseUrl+'/total')
  }
  totalcmdAnnee() {
     return this.service.get(this.baseUrl+'/totalByYear')
  }

   
}
