import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../app/core/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [ RouterLink,CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar implements OnInit{
  
  isLoggedIn = false;
  userName : string = '';

  constructor(private auth: AuthService, private router : Router) {}

  ngOnInit(): void {
     // subscribe to login state changes
     debugger;
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
   
}
