import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterModule, ReactiveFormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {

  loginForm: FormGroup;
   
    constructor(private auth: AuthService, private router: Router, private fb: FormBuilder) 
    {
      this.loginForm =  this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
       });
    }

    onSubmit() {
      debugger;
      if(this.loginForm.invalid) return;

      const formValue = this.loginForm.value;

      const loginData = {
        "email" : formValue.email,
        "password" : formValue.password
      }

      this.auth.login(loginData).subscribe({
        next: (res) => {
          console.log(res);
          alert('Logged in successful!');
          this.router.navigate(['/home']);
        },
        error: (err) => {
          console.error(err);
          alert('Invalid login');
        }
      });
    }
}
