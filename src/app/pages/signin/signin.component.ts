import { Component, OnInit } from '@angular/core';
import { MainServiceService } from '../../backend/main-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginRequest, LoginResponse } from '../../dto\'s/login.dto';
import { ForgetPasswordRequest, ForgetPasswordResponse } from 'src/app/dto\'s/forgetpassword.dto';
import { ResetPasswordRequest, ResetPasswordResponse } from 'src/app/dto\'s/resetpassword.dto';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  showForgotPassword = false;
  showResetPasswordForm = false;
  email = '';
  password = '';
  resetToken = '';
  newPassword = '';
  returnUrl: string = '/'; // Default redirect URL
  alertMessage: string | null = null; // Alert message to display
  alertType: 'success' | 'error' | 'info' | null = null; // Type of alert to display

  constructor(
    private mainService: MainServiceService,
    private router: Router,
    private route: ActivatedRoute // Inject ActivatedRoute to capture the return URL
  ) {}

  ngOnInit(): void {
    // Capture the return URL from the route parameters or set default to the main page
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  toggleForgotPassword() {
    this.showForgotPassword = !this.showForgotPassword;
  }

  preventDefault(event: Event): void {
    event.preventDefault();
  }

  showResetPasswordFormFn() {
    const request = new ForgetPasswordRequest(this.email);
    this.mainService.ForgetPassword(request).subscribe({
      next: (response: ForgetPasswordResponse) => {
        console.log('Password reset email sent:', response.message);
        this.alertMessage = 'Password reset email sent successfully.';
        this.alertType = 'success';
        this.showForgotPassword = false;
        this.showResetPasswordForm = true;
      },
      error: (error) => {
        console.error('Error sending password reset email:', error);
        this.alertMessage = 'Error sending password reset email. Please try again.';
        this.alertType = 'error';
      }
    });
  }

  login() {
    const request = new LoginRequest(this.email, this.password);
    this.mainService.Login(request).subscribe({
      next: (response: LoginResponse) => {
        console.log('Login successful:', response.token);
  
        // Store the token and userId in local storage
        localStorage.setItem('token', response.token);
        localStorage.setItem('userId', response.userId.toString());
  
        // Redirect to the captured returnUrl or default to the main page
        this.router.navigate([this.returnUrl]);  // Use the captured returnUrl
      },
      error: (error) => {
        console.error('Error during login:', error);
        this.alertMessage = 'Login failed. Please check your credentials and try again.';
        this.alertType = 'error';
      }
    });
  }

  resetPassword() {
    const request = new ResetPasswordRequest(this.email, this.resetToken, this.newPassword);
    this.mainService.ResetPassword(request).subscribe({
      next: (response: ResetPasswordResponse) => {
        console.log('Password reset successful:', response.message);
        this.alertMessage = 'Password reset successfully.';
        this.alertType = 'success';
        this.showResetPasswordForm = false;
        this.router.navigate(['/signin']); // Redirect back to login after reset
      },
      error: (error) => {
        console.error('Error during password reset:', error);
        this.alertMessage = 'Password reset failed. Please try again.';
        this.alertType = 'error';
      }
    });
  }
}
