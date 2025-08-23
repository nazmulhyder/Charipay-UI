import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class RegisterComponent {
name: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(private router: Router) {}

  onSignup() {
    // Basic validation: check if passwords match
    if (this.password !== this.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    // Here, you can integrate your backend API to register the user
    const signupData = {
      name: this.name,
      email: this.email,
      password: this.password
    };

    console.log('Signup Data:', signupData);

    // Simulate successful signup
    alert('Signup successful! Please login.');
    this.router.navigate(['/']); // Navigate back to login page
  }
}
