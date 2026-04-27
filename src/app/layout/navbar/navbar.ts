import { Component, HostListener, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs';

@Component({
  selector: 'app-navbar',
  imports: [ RouterLink,CommonModule, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar implements OnInit{
  
  isLoggedIn = false;
  userName : string = '';
  isHomePage = false;
isDonor = false;
  constructor(private auth: AuthService, private router : Router) {
     this.router.events
    .pipe(filter(event => event instanceof NavigationEnd))
    .subscribe(() => {
      this.isHomePage = this.router.url === '/';
    });
  }

  ngOnInit(): void {
     // subscribe to login state changes
     const role = this.auth.getUserRole();
     this.isDonor = role === 'Donor';
     this.auth.isLoggedIn$.subscribe( status => {
        this.isLoggedIn = status;
        console.log('from navbar', this.isLoggedIn);

        if(status)
        {
          this.userName = this.auth.getUserName();
        }

        else this.userName = '';
     })
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/auth/login']);
  }

  @HostListener('window:scroll', [])
onScroll() {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 10) {
    navbar?.classList.add('scrolled');
  } else {
    navbar?.classList.remove('scrolled');
  }
}


onWindowScroll() {
  const navbar = document.querySelector('.charipay-navbar');
  if (window.scrollY > 50) {
    navbar?.classList.add('scrolled');
  } else {
    navbar?.classList.remove('scrolled');
  }
}
   
}
