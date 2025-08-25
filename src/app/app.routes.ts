import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login';
import { RegisterComponent } from './auth/register/register';
import { Dashboard } from './dashboard/dashboard';
import { Guards } from './core/authguards';

export const routes: Routes = [
    {path: '', redirectTo: 'login', pathMatch: 'full' },
    {path:'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'dashboard', component: Dashboard, canActivate: [Guards]},
    { path: '**', redirectTo: 'login' }  // catch-all for undefined routes
];
