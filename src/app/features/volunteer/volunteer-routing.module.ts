import { Routes } from "@angular/router";
import { AuthGuard } from "../../core/guards/auth.guard";
import { VolunteerTasksComponent } from "./tasks/tasks";
import { VolunteerDashboard } from "./dashboard/dashboard";
import { VolunteerOpportunities } from "./opportunities/opportunities";

export const VOLUNTEER_ROUTES : Routes = [
  { path:'', 
    children : [
        {path:'volunteer-dashboard', component: VolunteerDashboard},
        {path:'volunteer-opportunities', component: VolunteerOpportunities},
        {path: '', redirectTo:'tasks', pathMatch:'full'}
    ]
  }

] 