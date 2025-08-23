import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {
   email: string = '';
    password: string = '';

    constructor(private auth: AuthService, private router: Router) {}

    onSubmit() {
      this.auth.login(this.email, this.password).subscribe({
        next: () => {
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          console.error(err);
          alert('Invalid login');
        }
      });
    }
}
