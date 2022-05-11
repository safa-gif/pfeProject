import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StocktableItem } from 'src/app/components/tables/stocktable/stocktable-datasource';
import {Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StockserviceService {

  constructor(private http: HttpClient) { }
  baseUrl = "http://localhost:2000/stock";
  retrieveStock(): Observable<StocktableItem[]> {
    return this.http.get<StocktableItem[]>(this.baseUrl);
   
  }
  countFrequent():Observable<StocktableItem[]>{
    return this.http.get<StocktableItem[]>(this.baseUrl+'/frequent')
  }
  totalStocks(){
    return this.http.get(this.baseUrl+'/totalStocks')
  }
  stockEmpty(){
    return this.http.get(this.baseUrl+'/stockDanger')
  }
  stockLoaded(){
    return this.http.get(this.baseUrl+'/stockLoad')
  }
  produitDisponible(){
    return this.http.get(this.baseUrl+'/stockDispo')
  }
}
