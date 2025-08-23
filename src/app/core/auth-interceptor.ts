import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';

@Injectable()

export class AuthInterceptor implements HttpInterceptor{
   
  constructor(private auth: AuthService)
  {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.auth.getToken();
     
    if(token)
    {
       req = req.clone({
        setHeaders: { Authorization :`Bearer ${token}`}
       });
    }

    return next.handle(req);

  }

}
