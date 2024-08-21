import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MainServiceService } from 'src/app/backend/main-service.service';
import { signup } from 'src/app/dto\'s/signup.dto';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  signup: signup = new signup('', '', '', '', '', '', 2, ''); // Initializing with default values
  selectedFileName: string = '';
  file: File | null = null; // Store selected file

  roles = [
    { id: 1, name: 'Admin' },
    { id: 2, name: 'User' }
  ];

  constructor(private mainService: MainServiceService, private router: Router) {}

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.file = file; // Store file for later use
      this.selectedFileName = file.name;
    }
  }

  onDateChange(event: any): void {
    this.signup.birthDate = event.value.toISOString(); // Convert the date to ISO format
  }

  onSubmit(): void {
    if (!this.signup.firstName || !this.signup.lastName || !this.signup.email || !this.signup.phone || !this.signup.birthDate || !this.signup.password) {
      alert('Please fill in all fields');
      return;
    }

    if (this.file) {
      this.mainService.uploadImage(this.file).subscribe(
        (imageUrl: string) => {
          this.signup.profileImage = imageUrl;
          this.submitSignup(); // Proceed with signup after image upload
        },
        error => {
          console.error('Image upload failed:', error);
        }
      );
    } else {
      this.submitSignup(); // Proceed without image upload
    }
  }

  private submitSignup(): void {
    const formData = new FormData();
    formData.append('firstName', this.signup.firstName);
    formData.append('lastName', this.signup.lastName);
    formData.append('email', this.signup.email);
    formData.append('phone', this.signup.phone);
    formData.append('birthDate', this.signup.birthDate);
    formData.append('password', this.signup.password);
    formData.append('profileImage', this.signup.profileImage);  // Store the image URL
    formData.append('userRoleID', this.signup.userRoleID.toString());

    this.mainService.Signup(formData).subscribe({
      next: () => {
        this.router.navigate(['/signin']);
      },
      error: (error) => {
        console.error('Signup failed', error);
      }
    });
  }
}
