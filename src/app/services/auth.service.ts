import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
   private apiUrl = "https://charipay-web-api.azurewebsites.net/api/Auth/"; // auth api

   constructor(private http: HttpClient) {}


   login(email : string, password : string) : Observable<any>
   {
      return this.http.post(`${this.apiUrl}/login`, {email, password})
       .pipe(
        tap((response : any) => {
          localStorage.setItem('token', response.token);
        })
       )
   }

   logout()
   {
     localStorage.removeItem('token');
   }

   getToken()
   {
     return localStorage.getItem('token');
   }

   isLoggedIn(): boolean {
       return !! this.getToken();
   }

}
