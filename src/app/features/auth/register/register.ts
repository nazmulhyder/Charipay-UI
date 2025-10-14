import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';
import { passwordMatchValidator } from '../../../shared/validators/password-match.validator';
@Component({
  selector: 'app-register',
  imports: [FormsModule, RouterModule, ReactiveFormsModule, CommonModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class RegisterComponent {
  loading = false;
  errorMessage = '';
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);

  registerForm : FormGroup = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      phone: ['', [Validators.required, Validators.pattern(/^\+?\d{7,15}$/)]],
      confirmPassword: ['', Validators.required],
      roleId: ['', Validators.required]
    },
      { validators: passwordMatchValidator('password', 'confirmPassword') });

  

  onSignup() {
    if (this.registerForm.invalid)
    {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    const formValue = this.registerForm.value;

    const signupData = {
      "fullName": formValue.fullName,
      "email": formValue.email,
      "password": formValue.password,
      "role": formValue.role,
      "phone": formValue.phone,
      "profileImageUrl" : null,
      "createdAt" : new Date().toISOString(),
      "addressLine1" : null,
      "postCode" : null,
      "dob" : null,
      "roleId" : formValue.roleId
    }

    this.auth.signup(signupData).subscribe ({
      next: (res) => {
        this.loading = false;
        alert('Registration successful!');
        this.registerForm.reset();
        this.router.navigate(['/auth/login'])
      },

      error:(err) =>{
         this.loading = false;
         this.errorMessage = err.error?.message || 'Registration failed. Please try again'
         alert(this.errorMessage);
      }
    });

    console.log('signup data', signupData);
  }
}
