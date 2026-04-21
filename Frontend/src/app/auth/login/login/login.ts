import { Component } from '@angular/core';
import { AuthService } from './../../../services/auth';
import { Router,RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
   loginData = {
    email: '',
    password: ''
  };

  errorMessage = '';
  isLoading = false;

  constructor(private authService: AuthService, private router: Router) {}

  onLogin(): void {
    this.errorMessage = '';

    if (!this.loginData.email || !this.loginData.password) {
      this.errorMessage = 'Please enter email and password';
      return;
    }

    this.isLoading = true;

    this.authService.login(this.loginData).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.authService.saveAuthData(response);

        const role = response.role?.toLowerCase();

        if (role === 'tenant') {
          this.router.navigate(['/tenant-dashboard']);
        } else if (role === 'manager') {
          this.router.navigate(['/manager-dashboard']);
        } else if (role === 'staff') {
          this.router.navigate(['/staff-dashboard']);
        } else {
          this.errorMessage = 'Invalid role received from backend';
        }
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = error?.error?.message || 'Invalid email or password';
      }
    });
  }

}
