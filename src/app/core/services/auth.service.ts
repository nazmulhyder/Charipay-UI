import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { Observable } from "rxjs";

interface ApiResponse <T> {
   sucess: boolean;
   message: string;
   data:T;
   errors : string[]
}

@Injectable ({providedIn: 'root'})

export class AuthService
{
    private http = inject(HttpClient);
    private tokenKey = 'token';
    private baseUrl = `${environment.apiUrl}/auth`

    login(email:string, password: string) : Observable<ApiResponse<{token: string}>> {
        return this.http.post<ApiResponse<{token:string}>> (`${this.baseUrl}/login`, {email, password});
    }

    register(model: any): Observable <ApiResponse<any>> {
        return this.http.post<ApiResponse<any>>(`${this.baseUrl}/register`, model)
    }

    storeToken(token:string) {localStorage.setItem(this.tokenKey, token)};
    getToken(){return localStorage.getItem(this.tokenKey)};
    logout() {localStorage.removeItem(this.tokenKey)};

    isLoggedIn(): boolean {
        const token = this.getToken();
        return !!token && !this.isTokenExpired(token);   
    }

      // ✅ Decode JWT payload
   decodeToken(token: string): any {
    try {
      const payload = token.split('.')[1];
      const decoded = JSON.parse(atob(payload.replace(/-/g, '+').replace(/_/g, '/')));
      return decoded;
    } catch (error) {
      console.log('Invalid token error from auth.service.ts:', error);
      return null;
    }
  }

    // ✅ Check expiry
 isTokenExpired(token: string): boolean {
    const decoded = this.decodeToken(token);
    if (!decoded || !decoded.exp) return true; // invalid or no exp
    const expiry = decoded.exp * 1000; // exp is in seconds
    return Date.now() > expiry;
  }

 getUserRole(): string {
    const token = this.getToken();
    if (!token) return '';
    const decoded = this.decodeToken(token);
    return decoded?.role ?? '';
  }


}