import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { User } from 'src/app/donnees/User';
import { throwError } from 'rxjs';


// const reqHeader = new HttpHeaders({ 'Content-Type': 'application/json', 'No-Auth': 'True' });

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
   findAll(): Observable<User[]>{
   return this.http.get<User[]>(this.baseUrl+'/findAll')
  
   }
   deleteUser(id:number|string){
    return this.http.delete(`http://localhost:2000/user/deleteUser/${id}`)
      // pipe(
      //   map((data: any) => {
      //     return data
      //   }), catchError(error => {
      //     return error
      //   })
      // );
   }
   updateUser(id:string|number, data:any){
    return this.http.put(`http://localhost:2000/user/${id}`,data)
   }
   count(){
     return this.http.get(this.baseUrl+'/count')
   }
   getSingleUser(id:number|string) {
     return this.http.get(`http://localhost:2000/user/getSingleUser/${id}`)
    // return this.http.get(this.baseUrl+'/getSingleUser/'+ id)
   }
 
}
