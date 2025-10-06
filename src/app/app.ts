import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from './core/services/auth.service';
import { Navbar } from '../layout/navbar/navbar';
import { Footer } from '../layout/footer/footer';

@Component({
  selector: 'app-root',
  standalone:true,
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App implements OnInit{
  protected title = 'Charipay-UI';
  private auth = inject(AuthService);
  private router = inject(Router);

  ngOnInit():void
  {
     if(this.auth.isLoggedIn())
     {
        const role = this.auth.getUserRole();
        this.redirectUser(role);
     }
  }

  private redirectUser(role:string)
    {
      switch(role){
        case 'Admin':
          this.router.navigate(['/admin/dashboard']);
          break;
        case 'Donor':
          this.router.navigate(['/donor/dashboard']);
          break;
        case 'Volunteer':
          this.router.navigate(['/volunteer/tasks']);
          break;
        default:
          this.router.navigate(['/'])
          break;
      }
    }
}
