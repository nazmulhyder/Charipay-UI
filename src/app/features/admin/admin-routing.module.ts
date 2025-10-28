import { Routes } from "@angular/router";
import { AdminDashboardComponent } from "./dashboard/dashboard";
import { Charities } from "./charities/charities";
import { Reports } from "./reports/reports";
import { AdminCampaigns } from "./campaigns/campaigns";

export const ADMIN_ROUTES : Routes = [
{
    path: '',
    children:[
        {path:'dashboard', component: AdminDashboardComponent},
        {path:'charities', component: Charities},
        {path:'campains', component:AdminCampaigns},
        {path:'reports', component: Reports},
        {path:'', redirectTo: 'dashboard', pathMatch:'full'}

    ]
}

]