import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class Guards  implements CanActivate{
  
  constructor(private auth: AuthService) {}

  canActivate():boolean {
    const token = this.auth.getToken();

    if(!token)
    {
       //redirect to login page
       return false
    }
    
    return true;
     
  }
  
}
