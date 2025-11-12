import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../app/core/services/auth.service';

@Component({
  selector: 'app-admin-layout',
  standalone:true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-layout.html',
  styleUrl: './admin-layout.css'
})
export class AdminLayout implements OnInit{
  sidebarOpen = true;
  userName:string = '';

  constructor(private router:Router, private auth: AuthService) {}
  
   ngOnInit(): void {
    this.userName = this.auth.getUserName();
  }

   toggleSidebar(){
     this.sidebarOpen = !this.sidebarOpen;
     const sidebar = document.getElementById('sidebar');
     if(sidebar) sidebar.classList.toggle('active');
   }

   logout() {
     localStorage.removeItem('token');
     this.router.navigate(['/auth/login']);
   }
}
