import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Campaign } from '../../../../shared/models/campaign.model';
import { CampaignService } from '../../../../core/services/campaign.service';
import { RouterLink } from '@angular/router';

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
export class Home  implements OnInit{
   featuredCampaigns : Campaign[] = [];
   loading = true;
  searchTerm = "";
  pageNumber = 1;
  pageSize = 10;
  selectedCampaignId : any;
  totalCount : number =0;

   constructor(private campaignService:  CampaignService){}

  ngOnInit(): void {
    this.campaignService.getPublicCampaigns(this.pageNumber, this.pageSize, true, this.searchTerm).subscribe({
      next: (res)=> {
        this.featuredCampaigns = res.data?.items || [];
        console.log('home', this.featuredCampaigns)
        this.loading = false;
      },
      error:(err) => {
        console.error('Error fetching featured campaigns', err);
        this.loading = false;
      }
        
      })
  }
}
