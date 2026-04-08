import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment.prod";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { ApiResponse } from "../../shared/models/api-response.model";
import { Campaign } from "../../shared/models/campaign.model";

@Injectable ({providedIn:'root'})

export class AdminService {
   private baseUrl = `${environment.apiUrl}/AdminDashboard`
   private charityBaseUrl = `${environment.apiUrl}/Charities`
   private campaignBaseUrl = `${environment.apiUrl}/Campaigns`

   constructor(private http : HttpClient) {}

   getUsers(pageNumber: number, pageSize:number, search?:string) : Observable<any> {
       let url = `${this.baseUrl}/UserList?pageNumber=${pageNumber}&pageSize=${pageSize}`;
       if (search) url+= `&search=${encodeURIComponent(search)}`;

       return this.http.get(url);
   }

   //#region Admin-> Charity
   createCharity(charity: any)
   {
     return this.http.post(`${this.charityBaseUrl}/CreateCharity`, charity);
   }

   updateCharity(charity: any)
   {
     return this.http.post(`${this.charityBaseUrl}/UpdateCharity`, charity);
   }

    getAllCharity(pageNumber: number, pageSize:number, search?:string) : Observable<any> 
    {
       let url = `${this.baseUrl}/GetAllCharity?pageNumber=${pageNumber}&pageSize=${pageSize}`;
       if (search) url+= `&search=${encodeURIComponent(search)}`;

       return this.http.get(url);
   }
   
   deleteCharity(id : string)
   {
     return this.http.delete(`${this.charityBaseUrl}/DeleteCharity?CharityId=${id}`);
   }

   getLookupCharity()
   {
     return this.http.get(`${this.charityBaseUrl}/GetLookupCharity`)
   }

   //#endregion

   //#region Campaigns
   getAllCampaign(pageNumber: number, pageSize:number, IsActive:boolean,IsFeatured?: boolean,  search?:string) : Observable<any> {
      let url = `${this.campaignBaseUrl}/Admin/AllCampaigns?PageNumber=${pageNumber}&PageSize=${pageSize}&IsActive=${IsActive}&IsFeatured=${IsFeatured}`;

      if (search)
        url += `&search=${encodeURIComponent(search)}`;

      return this.http.get(url);
   }

  //  createCampaign(campaign : any)
  //  {
  //     return this.http.post(`${this.campaignBaseUrl}/CreateCampaign`, campaign);
  //  }

createCampaign(payload: any): Observable<ApiResponse<Campaign>> {
  return this.http.post<ApiResponse<Campaign>>(
    `${this.campaignBaseUrl}/CreateCampaign`,
    payload
  );
}

updateCampaign(payload: any): Observable<ApiResponse<Campaign>> {
  return this.http.post<ApiResponse<Campaign>>(
    `${this.campaignBaseUrl}/UpdateCampaign`,
    payload
  );
}

uploadCampaignImage(campaignId: string, formData: FormData): Observable<any> {
  return this.http.post(`${this.campaignBaseUrl}/upload-image?CampaignId=${campaignId}`, formData);
}
  //   updateCampaign(campaign : any)
  //  {
  //     return this.http.post(`${this.campaignBaseUrl}/UpdateCampaign`, campaign);
  //  }

      deleteCampaign(id : string)
   {
     return this.http.delete(`${this.campaignBaseUrl}/DeleteCampaigns?CampaignId=${id}`);
   }

   //#endregion

   //#region Dashbaord
   getDashboard() {
   return this.http.get<any>(`${this.baseUrl}/dashboard`);
   }
   //#endregion Dashboard

}