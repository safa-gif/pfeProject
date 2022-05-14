import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  baseUrl = "http://localhost:2000/user";
  
  constructor(private http: HttpClient) {
    
   }
   login(data:any) {
     return this.http.post<any>(this.baseUrl+'/login', data).toPromise()
   }
   findAll(){
   return this.http.get(this.baseUrl+'/findAll').
   pipe(
    map((data: any) => {
      console.log(data);
      return data;
    }), catchError(error => {
      return error
    })
  );
   }
  //  deleteUser(id:string){
  //   return this.http.delete(this.baseUrl + 'deleteUser/' + id).
  //   pipe(
  //     map((data: any) => {
  //       return data;
  //     }), catchError(error => {
  //       return error
  //     })
  //   );
  //  }
   updateUser(id:string){
    return this.http.put(this.baseUrl+'/updateUser', id)
   }
   count(){
     return this.http.get(this.baseUrl+'/count')
   }
}
