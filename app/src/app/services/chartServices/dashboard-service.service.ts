import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// import { DashboardDataItem } from 'src/app/components/tables/dashboard-data/dashboard-data-datasource';
import { Dashboard } from 'src/app/donnees/Dashboard';

@Injectable({
  providedIn: 'root'
})
export class DashboardServiceService {

  constructor(private http: HttpClient) { }
  baseUrl = 'http://localhost:2000/dim'
  // allData():Observable<DashboardDataItem[]> {
  //   return this.http.get<DashboardDataItem[]>(this.baseUrl+'/retards')
  // }
  RetardsSemaine() {
    return this.http.get(this.baseUrl+'/retardsSemaine')
  }
  RetardsAnnee() {
    return this.http.get(this.baseUrl+'/retardsAnnee')
  }
  RetardsMois(){
    return this.http.get(this.baseUrl+'/retardsMois')
  }
  // retards(): Observable<Dashboard[]>{
  //  return this.http.get<Dashboard[]>(this.baseUrl+'/retards')

  // }
  retards(){
    return this.http.get(this.baseUrl+'/retards')
 
   }
}
