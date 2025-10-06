import { Routes } from "@angular/router";
import { AuthGuard } from "../../core/guards/auth.guard";
import { AdminDashboardComponent } from "./dashboard/dashboard";

export const ADMIN_ROUTES : Routes = [
{
    path: '',
    canActivate: [AuthGuard],
    data: {role : 'Admin'},
    children:[
        {path:'dashboard', component: AdminDashboardComponent},
        {path:'', redirectTo: 'dashboard', pathMatch:'full'}

    ]
}

]