import { Component, OnInit } from '@angular/core';
import { CampaignService } from '../../../../core/services/campaign.service';
import { Campaign } from '../../../../core/models/campaign.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-campaigns',
  standalone:true,
  imports: [CommonModule],
  templateUrl: './campaigns.html',
  styleUrl: './campaigns.css'
})
export class Campaigns implements OnInit{
  campaigns: Campaign[] = [];  
  constructor(private campainService: CampaignService) {}

  ngOnInit(): void {
     this.campainService.getAll().subscribe (res=> {
       this.campaigns = res;
     });
  }

  onViewDetail(id:string) : void {
    console.log('viewing campaigns:', id)
  }
  
  
 
}
