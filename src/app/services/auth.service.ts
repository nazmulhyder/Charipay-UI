import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
   private apiUrl_live = "https://charipay-web-api.azurewebsites.net/api/Auth"; // auth api
   // private apiUrl_local = "http://localhost:5291/api/Auth"; // auth api


   constructor(private http: HttpClient) {}


   login(userData: any) : Observable<any>
   {
      return this.http.post(`${this.apiUrl_live}/login`,  userData)
       .pipe(
        tap((response : any) => {
          localStorage.setItem('token', response.token);
        })
       )
   }

   register(userData : any) : Observable<any>
   {
      return this.http.post(`${this.apiUrl_live}/Signup`, userData);
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
