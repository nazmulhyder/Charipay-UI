import { Observable } from "rxjs";
import { environment } from "../../../environments/environment.prod"
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})

export class DonorService {
    private donorBaseUrl = `${environment.apiUrl}/Donations`

    constructor(private http : HttpClient) {}

     getPagedDonations(pageNumber: number, pageSize:number, search?:string) : Observable<any> {
              let url = `${this.donorBaseUrl}/donations?PageNumber=${pageNumber}&PageSize=${pageSize}`;
        
              if (search)
                url += `&search=${encodeURIComponent(search)}`;
        
              return this.http.get(url);
    }

       GetDonaionDashboard() : Observable<any> {
          let url = `${this.donorBaseUrl}/dashboard`;
          return this.http.get(url);
       }

           getDonationById(donationId: string) : Observable<any> {
              let url = `${this.donorBaseUrl}/donationById?DonationId=${donationId}`;
              return this.http.get(url);
    }
}