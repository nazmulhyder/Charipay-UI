import { Component, OnInit } from '@angular/core';
import { CampaignService } from '../../../../core/services/campaign.service';
import { Campaign } from '../../../../shared/models/campaign.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';



@Component({
  selector: 'app-campaigns',
  standalone:true,
  imports: [CommonModule, RouterModule],
  templateUrl: './campaigns.html',
  styleUrl: './campaigns.css'
})
export class Campaigns implements OnInit{
  campaigns: Campaign[] = [];  
  searchTerm = "";
  loading = false;
  pageNumber = 1;
  pageSize = 10;
  selectedCampaignId : any;
  totalCount : number =0;

  constructor(private campainService: CampaignService) {}

  ngOnInit(): void {
     this.campainService.getPublicCampaigns(this.pageNumber, this.pageSize, false, this.searchTerm)
     .subscribe({
      next: (res) =>{
          console.log("Featured campaign", res);
           this.campaigns = res.data?.items;
           this.totalCount = res.data?.totalCount;
           this.loading = false;
      },
      error: (err)=>{
        alert('Failed to load campaigns data!');
             this.loading = false;
      }
     }
    );
  }

getProgressPercentage(c: any): number {
  if (!c.goalAmount || c.goalAmount === 0) return 0;
  const percent = (c.currentAmount / c.goalAmount) * 100;
  return Math.min(100, Math.max(0, percent));
}


onViewDetail(id: string) {
  console.log(id);
}

}
  
  