import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { User } from 'src/app/donnees/User';


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
   deleteUser(id:string){
    return this.http.delete(this.baseUrl+'/deleteUser/'+id)
    // pipe(
    //   map((data: any) => {
    //     return data;
    //   }), catchError(error => {
    //     return error
    //   })
    // );
   }
   updateUser(id:string|number, data:any){
    return this.http.put(this.baseUrl+`/updateUser/${id}`,data)
   }
   count(){
     return this.http.get(this.baseUrl+'/count')
   }
   getSingleUser(id:string) {
     return this.http.get(`http://localhost:2000/user/getSingleUser/${id}`)
   }
 
}
