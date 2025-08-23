import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RuleGuards implements CanActivate {
  constructor(private auth: AuthService) {}

  canActivate(): boolean {
     const token = this.auth.getToken();

     if(token)
     {
       const decoded : any = jwtDecode(token);
       if(decoded.role === "Admin")
        return true;
     }

     // redirect forbidden route
     return false;
  }

}


function jwtDecode(token: string): any {
  const payloadBase64 = token.split('.')[1]; // get payload
  const decoded = atob(payloadBase64.replace(/-/g, '+').replace(/_/g, '/'));
  return JSON.parse(decoded);
}

