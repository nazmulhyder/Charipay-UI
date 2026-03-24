import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CampaignService } from '../../../../core/services/campaign.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-campaign-detail',
  imports: [CommonModule, RouterModule],
  templateUrl: './campaign-detail.html',
  styleUrl: './campaign-detail.css'
})
export class CampaignDetail implements OnInit{
   campaign: any = null;
    loading = false;
    errorMessage = '';

    constructor(
      private route: ActivatedRoute,
      private campaignService: CampaignService
    ) {}

  
  ngOnInit(): void {
    const campaignId = this.route.snapshot.paramMap.get('id');

    if (campaignId) {
      this.getCampaignDetails(campaignId);
    } else {
      this.errorMessage = 'Invalid campaign ID.';
    }
  }


   getCampaignDetails(id: string): void {
    this.loading = true;
    this.errorMessage = '';

    this.campaignService.getCampaignById(id).subscribe({
      next: (response) => {
        this.campaign = response.data;
        this.loading = false;
      },
      error: (error) => {
        this.errorMessage = 'Failed to load campaign details.';
        this.loading = false;
        console.error(error);
      }
    });
  }

  getProgress(): number {
    if (!this.campaign?.goalAmount || this.campaign.goalAmount <= 0) {
      return 0;
    }

    return Math.min((this.campaign.currentAmount / this.campaign.goalAmount) * 100, 100);
  }
}
