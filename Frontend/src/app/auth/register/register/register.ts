import { AuthService } from './../../../services/auth';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  registerData = {
    fullName: '',
    phoneNumber: '',
    email: '',
    password: ''
  };

  errorMessage = '';
  successMessage = '';
  isLoading = false;

  constructor(private authService: AuthService, private router: Router) {}

  onRegister(): void {
    this.errorMessage = '';
    this.successMessage = '';

    if (
      !this.registerData.fullName ||
      !this.registerData.phoneNumber ||
      !this.registerData.email ||
      !this.registerData.password
    ) {
      this.errorMessage = 'Please fill all fields';
      return;
    }

    this.isLoading = true;

    this.authService.register(this.registerData).subscribe({
      next: () => {
        this.isLoading = false;
        this.successMessage = 'Registration successful';

        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 1000);
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = error?.error?.message || 'Registration failed';
      }
    });
  }
}