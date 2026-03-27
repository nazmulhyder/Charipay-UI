import { Inject, Injectable } from "@angular/core";
import { ApiService } from "./api.service";
import { Observable, of } from "rxjs";
import { Campaign } from "../../shared/models/campaign.model";
import { environment } from "../../../environments/environment.prod";
import { HttpClient } from "@angular/common/http";
import { DonationResponse } from "../../shared/models/donation-response.model";
import { ApiResponse } from "../../shared/models/api-response.model";
@Injectable ({providedIn:'root'})

export class CampaignService {
   private campaignBaseUrl = `${environment.apiUrl}/Campaigns`
   private donationBaseUrl = `${environment.apiUrl}/Donations`
  constructor(private api: ApiService, private http: HttpClient) {}

   // getAll(): Observable<Campaign[]> {
   //    //return this.api.get<Campaign[]>('campaign');
   //    return of(this.getMockCampains());
   // }

   // getById(id:string){
   //   const campaign = this.getMockCampains().find(c=>c.campaignId === id)!;
   //   return of(campaign);
   // }


  getPublicCampaigns(pageNumber: number, pageSize:number, IsFeatured:boolean, search?:string) : Observable<any> 
  {
       let url = `${this.campaignBaseUrl}/Public/AllCampaigns?pageNumber=${pageNumber}&pageSize=${pageSize}&IsFeatured=${IsFeatured}`;
       if (search) url+= `&search=${encodeURIComponent(search)}`;

       return this.http.get(url);
   }

 getCampaignById(id: any) {
  return this.http.get<any>(`${this.campaignBaseUrl}/GetById?CampaignId=${id}`);
}

CreateDonation(payload: any): Observable<ApiResponse<DonationResponse>> {
  return this.http.post<ApiResponse<DonationResponse>>(
    `${this.donationBaseUrl}/CreateDonation`,
    payload
  );
}
  
}


