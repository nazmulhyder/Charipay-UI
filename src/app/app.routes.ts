import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login';
import { RegisterComponent } from './auth/register/register';
import { Dashboard } from './dashboard/dashboard';
import { Guards } from './core/authguards';
import { Home } from './public/home/home';
import { NgModule } from '@angular/core';

export const routes: Routes = [
  { path: '', component: Home }, // public landing page
  { path: 'home', component: Home }, // optional alias
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: Dashboard, canActivate: [Guards] },
  { path: '**', redirectTo: '' } // catch-all redirects to home
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
