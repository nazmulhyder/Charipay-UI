import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AdminService } from '../../../core/services/admin.service';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './users.html',
  styleUrl: './users.css'
})
export class Users  implements OnInit{

  users: any[] = [];
  totalCount = 0;
  pageNumber = 1;
  pageSize = 10;
  loading = false;
  searchTerm = '';

  constructor(private adminService : AdminService) {}
      
  ngOnInit(): void {
      this.pageNumber =1;
      this.loadUsers();
  }


  loadUsers() {
    this.loading = true;
    this.adminService.getUsers(this.pageNumber, this.pageSize, this.searchTerm)
    .subscribe({
      next:(res) => {
        this.loading = false;
        this.users = res.data?.items || [];
        this.totalCount = res.data?.totalCount || 0;
      },

      error: (err) => {
        this.loading = false; 
        console.error('Failed to load users', err);
      }
    });
  }

    onSearch()
  {
    this.pageNumber = 1;
    this.loadUsers();
  }

  onPageChange(page:number)
  {
     this.pageNumber = page;
     this.loadUsers();
  }
}
