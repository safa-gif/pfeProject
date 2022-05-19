import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable, throwError } from 'rxjs';
import { Stock } from 'src/app/donnees/Stock';

@Injectable({
  providedIn: 'root'
})
export class StockserviceService {

  constructor(private http: HttpClient) { }
  baseUrl = "http://localhost:2000/stock";
  // retrieveStock(): Observable<StocktableItem[]> {
  //   return this.http.get<StocktableItem[]>(this.baseUrl);
   
  // }
  // findStock(): Observable<Stock[]> {
  //   return this.http.get<Stock[]>(this.baseUrl);
   
  // }
  // countFrequent():Observable<StocktableItem[]>{
  //   return this.http.get<StocktableItem[]>(this.baseUrl+'/frequent')
  // }
  countFrequent() : Observable<Stock[]>{
    return this.http.get<Stock[]>(this.baseUrl+'/frequent')
  }
  //material data table
  getStock(){
    return this.http.get(this.baseUrl+'/frequent')
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
  
}
