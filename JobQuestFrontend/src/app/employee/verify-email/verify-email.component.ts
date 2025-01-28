import { Component } from '@angular/core';
import { UserProfile } from '../../models/userProfile/user-profile';
import { FormControl, FormGroup } from '@angular/forms';
import { UserService } from '../../services/employee/user.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

const Toast = Swal.mixin({
  toast: true,
  position: 'top',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  },
});

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrl: './verify-email.component.css',
})
export class VerifyEmailComponent {
  otpSent: boolean = false;
  emailData: UserProfile = new UserProfile();
  generatedOTP: string = '';

  verifyCredentials = new FormGroup({
    userEmail: new FormControl('', []),

    userOTP: new FormControl('', []),
  });

  constructor(private userService: UserService, private route: Router) {}

  onFormSubmit(): void {
    if (this.otpSent) {
      this.verifyOTP();
    } else {
      this.sendOtp();
    }
  }

  verifyOTP() {
    const userEmail = this.verifyCredentials.value.userEmail;
    const userOTP = this.verifyCredentials.value.userOTP;

    this.userService.verifyOTP(userOTP!, userEmail!).subscribe((response) => {
      if (response) {
        this.route.navigate(['/employee/resetPassword'], { queryParams: { userEmail } });
        Toast.fire({
          icon: 'success',
          title: 'Email verified with OTP !',
        });
      } else {
        this.otpSent = false;
        Toast.fire({
          icon: 'warning',
          title: 'Entered OTP is incorrect, send OTP again!',
        });
      }
    });
  }

  sendOtp() {
    const userEmail = this.verifyCredentials.value.userEmail;
    this.userService.sendOTP(userEmail!).subscribe((response) => {
      if (response) {
        this.otpSent = true;
        Toast.fire({
          icon: 'success',
          title: 'OTP sent successfully',
        });
      } else {
        Toast.fire({
          icon: 'error',
          title: 'OTP not sent. Please check your email',
        });
      }
    });
  }
}
