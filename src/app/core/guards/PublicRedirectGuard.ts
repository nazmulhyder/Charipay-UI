import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class PublicRedirectGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(): boolean | UrlTree {
    if (!this.authService.isLoggedIn()) {
      return true;
    }

    const role = this.authService.getUserRole();

    if (role === 'Admin') {
      return this.router.parseUrl('/admin');
    }

    if (role === 'Volunteer') {
      return this.router.parseUrl('/volunteer');
    }

    if (role === 'Donor') {
      return this.router.parseUrl('/donor');
    }

    return true;
  }
}