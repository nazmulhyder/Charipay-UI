import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment.prod";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { VolunteerTasks } from "../../features/admin/volunteer-tasks/volunteer-tasks";
import { ApiResponse } from "../../shared/models/api-response.model";

@Injectable ({providedIn:'root'})

export class VolunteerService {
    private adminBaseUrl = `${environment.apiUrl}/Admin`
     private volunteerBaseUrl = `${environment.apiUrl}/Volunteers`

constructor(private http : HttpClient) {}


       getAllVolunteerTaskLists(pageNumber: number, pageSize:number, search?:string) : Observable<any> {
          let url = `${this.adminBaseUrl}/volunteer/volunteer-task-list?PageNumber=${pageNumber}&PageSize=${pageSize}`;
    
          if (search)
            url += `&search=${encodeURIComponent(search)}`;
    
          return this.http.get(url);
       }

       createVolunteerTask(payload : any) {
          return this.http.post(`${this.adminBaseUrl}/campaigns/create-volunteer-tasks`, payload);
       }

      updateVolunteerTask(payload: any): Observable<ApiResponse<VolunteerTasks>> {
      return this.http.post<ApiResponse<VolunteerTasks>>(
         `${this.adminBaseUrl}/campaigns/create-volunteer-tasks`,
         payload
      );

      }

      getVolunteerOpportunities(pageNumber: number, pageSize:number, search?:string) : Observable<any> {
          let url = `${this.volunteerBaseUrl}/opportunities?PageNumber=${pageNumber}&PageSize=${pageSize}`;
    
          if (search)
            url += `&search=${encodeURIComponent(search)}`;
    
          return this.http.get(url);
       }


}