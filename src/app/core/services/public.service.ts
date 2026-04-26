import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment.prod";
import { Observable } from "rxjs";

@Injectable ({providedIn:'root'})

export class PublicService {
    private publicBaseUrl = `${environment.apiUrl}/Public`
    constructor(private http : HttpClient) {}
    
     getHomeStats() : Observable<any> {
              let url = `${this.publicBaseUrl}/home-stats`;
              return this.http.get(url);
           }
    
}