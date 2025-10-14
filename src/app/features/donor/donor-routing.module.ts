import { Routes } from "@angular/router";
import { AuthGuard } from "../../core/guards/auth.guard";
import { DonorDashboardComponent } from "./dashboard/dashboard";

export const DONOR_ROUTES : Routes = [
    {
        path:'',
        children:[
            {path:'dashboard', component:DonorDashboardComponent},
            {path:'', redirectTo:'dashboard', pathMatch:'full'}
        ]

    }
]