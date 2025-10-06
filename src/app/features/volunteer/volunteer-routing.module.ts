import { Routes } from "@angular/router";
import { AuthGuard } from "../../core/guards/auth.guard";
import { VolunteerTasksComponent } from "./tasks/tasks";

export const VOLUNTEER_ROUTES : Routes = [
  { path:'', 
    canActivate:[AuthGuard],
    data :{role:'volunteer'},
    children : [
        {path:'tasks', component: VolunteerTasksComponent},
        {path: '', redirectTo:'tasks', pathMatch:'full'}
    ]
  }

] 