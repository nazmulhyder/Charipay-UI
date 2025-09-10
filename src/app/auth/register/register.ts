import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { passwordMatchValidator } from '../../shared/validators/password-match.validator';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { ToastService } from '../../shared/custom/toast-service';
@Component({
  selector: 'app-register',
  imports: [FormsModule, RouterModule, ReactiveFormsModule, CommonModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class RegisterComponent {

  registerForm: FormGroup;
  loading = false;
  errorMessage = '';

  constructor(private router: Router, private fb: FormBuilder, private auth: AuthService) {

    this.registerForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      phone: ['', [Validators.required, Validators.pattern(/^\+?\d{7,15}$/)]],
      confirmPassword: ['', Validators.required],
      role: ['', Validators.required]
    },
      { validators: passwordMatchValidator('password', 'confirmPassword') });

  }

  onSignup() {
    if (this.registerForm.invalid) return;

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
      "dob" : null
    }

    this.auth.register(signupData).subscribe ({
      next: (res) => {
        this.loading = false;
        alert('Registration successful!');
        this.registerForm.reset();
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
