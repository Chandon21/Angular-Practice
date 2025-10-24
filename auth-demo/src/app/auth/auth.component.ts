import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent {
  isLoginMode = true;          // Switch between login & signup
  isLoading = false;           // Loading spinner
  error: string | null = null; // Firebase error message

  constructor(private authService: AuthService) {}

  // Toggle between login & signup mode
  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  // Handle form submission
  onSubmit(form: NgForm) {
    if (!form.valid) return;

    const { email, password } = form.value;
    this.isLoading = true;
    this.error = null;

    let authObs;

    if (this.isLoginMode) {
      authObs = this.authService.login(email, password);
    } else {
      authObs = this.authService.signup(email, password);
    }

    authObs.subscribe({
      next: (resData) => {
        console.log('Success:', resData); // Debug info in console
        this.isLoading = false;
        this.error = null;
        form.reset();
      },
      error: (err) => {
        console.error('Error:', err); // Debug in console

        // Display Firebase error message nicely
        if (err.error && err.error.error && err.error.error.message) {
          switch (err.error.error.message) {
            case 'EMAIL_EXISTS':
              this.error = 'This email already exists!';
              break;
            case 'EMAIL_NOT_FOUND':
              this.error = 'No account found with this email!';
              break;
            case 'INVALID_PASSWORD':
              this.error = 'Incorrect password!';
              break;
            case 'USER_DISABLED':
              this.error = 'This user account has been disabled!';
              break;
            default:
              this.error = err.error.error.message;
          }
        } else {
          this.error = 'An unknown error occurred!';
        }

        this.isLoading = false;
      },
    });
  }
}
