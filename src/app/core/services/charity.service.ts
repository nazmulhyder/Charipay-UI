import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment.prod";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable ({providedIn:'root'})

export class CharityService {
     private baseUrl = `${environment.apiUrl}/Admin`
     private charityBaseUrl = `${environment.apiUrl}/Charities`;

      constructor(private http : HttpClient) {}

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
          return this.http.get(`${this.charityBaseUrl}/dropdown/GetLookupCharity`)
        }
     
        //#endregion
}
