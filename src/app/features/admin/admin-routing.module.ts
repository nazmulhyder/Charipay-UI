import { Routes } from "@angular/router";
import { AdminDashboardComponent } from "./dashboard/dashboard";
import { Charities } from "./charities/charities";
import { Reports } from "./reports/reports";
import { AdminCampaigns } from "./campaigns/campaigns";
import { Users } from "./users/users";
//import { Volunteers } from "./volunteers/volunteers";
import { Donations } from "./donations/donations";
import { VolunteerTasks } from "./volunteer-tasks/volunteer-tasks";
import { VolunteerApplications } from "./volunteer-applications/volunteer-applications";

export const ADMIN_ROUTES : Routes = [
{
    path: '',
    children:[
        { path: 'dashboard', component: AdminDashboardComponent },
        { path: 'users', component: Users },
        { path: 'charities', component: Charities },
        { path: 'campaigns', component: AdminCampaigns },
        { path: 'reports', component: Reports },
        { path: 'volunteer-applications', component: VolunteerApplications },
        { path: 'volunteer-tasks', component: VolunteerTasks },
        { path: 'donations', component: Donations },
        { path: '', redirectTo: 'dashboard', pathMatch: 'full' }

    ]
}

]