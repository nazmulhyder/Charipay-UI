import { Inject, Injectable } from "@angular/core";
import { ApiService } from "./api.service";
import { Observable, of } from "rxjs";
import { Campaign } from "../../shared/models/campaign.model";
@Injectable ({providedIn:'root'})

export class CampaignService {
  constructor(private api: ApiService) {}

   getAll(): Observable<Campaign[]> {
      //return this.api.get<Campaign[]>('campaign');
      return of(this.getMockCampains());
   }

   getById(id:string){
     const campaign = this.getMockCampains().find(c=>c.campaignId === id)!;
     return of(campaign);
   }

   getFeaturedCampains() :Observable<Campaign[]> {
      return of(this.getMockCampains().splice(0,3));
   }

   //temporary static data (mock)
   private getMockCampains() : Campaign[] {
     return [
        {   campaignId: 'b1',
            campaignName :'Clean Water Project',
            campaignDescription :'Help provide clean water to remote villages.',
            goalAmount :5000,
            currentAmount :100,
            chairtyName : 'WaterAid',
            campaignStartDate: '2025-09-01T00:00:00Z',
            campaignEndDate: '2025-12-01T00:00:00Z',
            imageUrl : ''
        },
         {   campaignId: 'b2',
            campaignName :'Education for All',
            campaignDescription :'Support rural schools with learning materials.',
            goalAmount :10000,
            currentAmount :4200,
            chairtyName : 'EduCare',
            campaignStartDate: '2025-08-01T00:00:00Z',
            campaignEndDate: '2025-10-31T00:00:00Z',
            imageUrl : ''
        },
         {   campaignId: 'b3',
            campaignName :'Food Relief Program',
            campaignDescription :'Feed families affected by natural disasters.',
            goalAmount :12000,
            currentAmount :2200,
            chairtyName : 'FeedHope',
            campaignStartDate: '2025-08-01T00:00:00Z',
            campaignEndDate: '2025-10-31T00:00:00Z',
            imageUrl : ''
        }
     ]
   }
}


