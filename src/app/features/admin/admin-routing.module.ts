import { Routes } from "@angular/router";
import { AdminDashboardComponent } from "./dashboard/dashboard";

export const ADMIN_ROUTES : Routes = [
{
    path: '',
    children:[
        {path:'dashboard', component: AdminDashboardComponent},
        {path:'', redirectTo: 'dashboard', pathMatch:'full'}

    ]
}

]