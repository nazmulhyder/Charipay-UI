import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment.prod";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";

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

   //#endregion

   //#region Campaigns
   getAllCampaign(pageNumber: number, pageSize:number, search?:string) : Observable<any> {
      let url = `${this.campaignBaseUrl}/GetAllCampaigns?PageNumber=${pageNumber}&PageSize=${pageSize}`;

      if (search)
        url += `search=${encodeURIComponent(search)}`;

      return this.http.get(url);
   }

   createCampaign(campaign : any)
   {
      this.http.post(`${this.campaignBaseUrl}/CreateCampaign`, campaign);
   }
   //#endregion

}