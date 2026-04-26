import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Campaign } from '../../../../shared/models/campaign.model';
import { CampaignService } from '../../../../core/services/campaign.service';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PublicService } from '../../../../core/services/public.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports:
    [
      CommonModule, RouterLink
    ],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  featuredCampaigns: Campaign[] = [];
  loading = true;
  searchTerm = "";
  pageNumber = 1;
  pageSize = 10;
  selectedCampaignId: any;
  totalCount: number = 0;
  totalDonated = 0;
  totalCampaigns = 0;
  totalDonors = 0;
  totalVolunteers = 0;


  constructor(private campaignService: CampaignService, private toastr: ToastrService, private publicService: PublicService) { }

  ngOnInit(): void {

    // this.toastr.success('Toastr is working!', 'Success');
    this.getHomeStats();
    this.campaignService.getPublicCampaigns(this.pageNumber, this.pageSize, true, this.searchTerm).subscribe({
      next: (res) => {
        this.featuredCampaigns = res.data?.items || [];
        console.log('home', this.featuredCampaigns)
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching featured campaigns', err);
        this.toastr.error('Error fetching featured campaigns!', 'Error');
        this.loading = false;
      }

    })
  }

  getHomeStats()
  {
    this.publicService.getHomeStats().subscribe({
      next: (res) => {
        this.totalDonated = res.data?.totalDonated;
        this.totalCampaigns = res.data?.totalCampaigns;
        this.totalDonors = res.data?.totalDonors;
        this.totalVolunteers = res.data?.totalVolunteers;
      },
      error: (err) => {
        this.toastr.error('Error fetching home stats!', 'Error');
        this.loading = false;
      }

    })
  }

  getProgress(campaign: any): number {
    if (!campaign?.goalAmount || campaign.goalAmount <= 0) {
      return 0;
    }

    const progress = (campaign.currentAmount / campaign.goalAmount) * 100;
    return Math.min(progress, 100);
  }
}
