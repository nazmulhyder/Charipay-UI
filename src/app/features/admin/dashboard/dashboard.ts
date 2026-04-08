import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../core/services/admin.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


  interface RecentDonation {
  donorName: string;
  campaignName: string;
  amount: number;
  createdAt: string;
}

interface DashboardData {
  totalUsers: number;
  totalCharities: number;
  totalCampaigns: number;
  totalDonations: number;
  recentDonations: RecentDonation[];
}


@Component({
  selector: 'app-dashboard',
  standalone:true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class AdminDashboardComponent implements OnInit
{
  users: any[] = [];
  totalCount = 0;
  pageNumber = 1;
  pageSize = 10;
  loading = false;
  searchTerm = '';
  dashboardData : DashboardData | null = null;
   isLoading = false;
  errorMessage = '';
 
  constructor(private adminService: AdminService){}
  
  ngOnInit(): void {
    this.pageNumber =1;
    //this.loadUsers();
    this.loadDashboard();
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

  loadDashboard()
  {
    this.isLoading = true;
    this.errorMessage = '';
    this.adminService.getDashboard().subscribe({
      next: (res) =>{
          this.dashboardData = res?.data;
          this.isLoading = false;
          console.log(this.dashboardData);
      }, 

      error: (err) => {
            console.error('Failed to load dashboard data', err);
            this.errorMessage = 'Failed to load dashboard data.';
            this.isLoading = false;
      }
    })
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
