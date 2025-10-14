import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment.prod";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable ({providedIn:'root'})

export class AdminService {
   private baseUrl = `${environment.apiUrl}/AdminDashboard`

   constructor(private http : HttpClient) {}

   getUsers(pageNumber: number =1, pageSize:number = 10, search?:string) : Observable<any> {
       let url = `${this.baseUrl}/UserList?pageNumber=${pageNumber}&pageSize=${pageSize}`;
       if (search) url+= `&search=${encodeURIComponent(search)}`;

       return this.http.get(url);
   }

}