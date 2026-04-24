import { Routes } from "@angular/router";
import { AuthGuard } from "../../core/guards/auth.guard";
import { DonorDashboardComponent } from "./dashboard/dashboard";
import { Campaigns } from "../public/pages/campaigns/campaigns";

export const DONOR_ROUTES : Routes = [
    {
        path:'',
        children:[
            {path:'dashboard', component:DonorDashboardComponent},
            {path: 'campaigns', component: Campaigns },
            {path:'', redirectTo:'dashboard', pathMatch:'full'}
        ]

    }
]