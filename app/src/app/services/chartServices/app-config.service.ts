import { Injectable } from '@angular/core';
import { AppConfig } from '../../donnees/AppConfig';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AppConfigService {

  
  config: AppConfig = {
    theme: 'lara-light-blue',
    dark: false,
    inputStyle: 'outlined',
    ripple: true
};

private configUpdate = new Subject<AppConfig>();
baseURL = "http://localhost:2000/dim"
  constructor(private http: HttpClient) { }
  configUpdate$ = this.configUpdate.asObservable();

    updateConfig(config: AppConfig) {
        this.config = config;
        this.configUpdate.next(config);
    }
     late () {
       return this.http.get(this.baseURL+'/late')
     }
    getConfig() {
        return this.config;
    }
    latepie() {
      return this.http.get(this.baseURL+'/latepie')
    }
}
