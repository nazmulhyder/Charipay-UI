import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterModule, ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {

   private fb = inject(FormBuilder);
   private auth = inject(AuthService);
   private router = inject(Router);
   private readonly toastr = inject(ToastrService);
   
   loading = false;

    loginForm : FormGroup =  this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
       });

    onSubmit() {
      debugger;
      if(this.loginForm.invalid) {
        this.loginForm.markAllAsTouched();
        return;
      }

      this.loading = true;


      const {email, password} = this.loginForm.value;

      this.auth.login(email, password).subscribe({
        next: (res) => {
          this.loading = false
          this.auth.storeToken(res.data.token);
          console.log(res);
          //alert('Logged in successful!');
           this.toastr.success('Logged in successful', 'success')
          this.redirectUser(this.auth.getUserRole());
        },
        error: (err) => {
          console.error(err);
          //alert('Invalid login');
          this.toastr.error('Invalid login!', 'Error')
        }
      });
    }

    private redirectUser(role:string)
    {
      debugger;
      switch(role){
        case 'Admin':
          this.router.navigate(['/admin/dashboard']);
          break;
        case 'Donor':
          this.router.navigate(['/donor/dashboard']);
          break;
        case 'Volunteer':
          this.router.navigate(['/volunteer/volunteer-dashboard']);
          break;
        default:
          this.router.navigate(['/'])
          break;
      }
    }
}
