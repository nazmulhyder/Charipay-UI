import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-volunteer-layout',
  standalone:true,
  imports: [CommonModule, RouterModule],
  templateUrl: './volunteer-layout.html',
  styleUrl: './volunteer-layout.css'
})
export class VolunteerLayout  implements OnInit{ 
 sidebarOpen = true;
  userName:string = '';

  isSidebarOpen = false;
 isVolunteerMenuOpen = false;


toggleVolunteerMenu(): void {
  this.isVolunteerMenuOpen = !this.isVolunteerMenuOpen;
}

  constructor(private router:Router, private auth: AuthService) {}
  
   ngOnInit(): void {
    this.userName = this.auth.getUserName();
  }

   toggleSidebar(){
     this.isSidebarOpen = !this.isSidebarOpen;
     this.sidebarOpen = !this.sidebarOpen;
     const sidebar = document.getElementById('sidebar');
     if(sidebar) sidebar.classList.toggle('active');
   }

   logout() {
     localStorage.removeItem('token');
    localStorage.removeItem('userName'); // if you store it
    this.auth.logout();
    this.router.navigate(['/'], { replaceUrl: true });
   }
}
