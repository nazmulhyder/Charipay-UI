import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { DonorService } from '../../../core/services/donor.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';


export interface DonorDashboard {
  totalDonated: number;
  totalDonations: number;
  campaignsSupported: number;
  recentDonations: RecentDonation[];
}

export interface RecentDonation {
  donationId: number;
  campaignName: string;
  charityName: string;
  amount: number;
  donationDate: string;
  paymentStatus: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class DonorDashboardComponent implements OnInit {
  userName : string = '';
  dashboard?: DonorDashboard;
  isLoading = false;
  errorMessage = '';

  constructor(private auth : AuthService, private donorService: DonorService) {}

  ngOnInit(): void {
    this.userName = this.auth.getUserName();
     this.loadDashboard();
  }

   loadDashboard(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.donorService.GetDonaionDashboard().subscribe({
      next: (res) => {
        if (res.success && res.data) {
          this.dashboard = res.data;
        } else {
          this.errorMessage = res.message || 'Failed to load donor dashboard.';
        }

        this.isLoading = false;
      },
      error: (err) => {
        console.error('Donor dashboard load error:', err);
        this.errorMessage = 'Something went wrong while loading donor dashboard.';
        this.isLoading = false;
      }
    });
  }
}
