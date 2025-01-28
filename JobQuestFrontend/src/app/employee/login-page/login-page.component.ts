import { Component } from '@angular/core';
import { UserProfile } from '../../models/userProfile/user-profile';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/employee/user.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { UserProfileService } from '../../services/user-profile.service';
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
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css',
})
export class LoginPageComponent {
  document: Document = new Document();
  passwordType: boolean = false;

  constructor(
    private userService: UserService,
    private router: Router,
    private userProfileService: UserProfileService,
    private messageService: MessageService
  ) {}

  userCredentials = new FormGroup({
    userEmail: new FormControl('', [Validators.required, Validators.email]),
    userPassword: new FormControl('', []),
  });

  onRoutingHome() {
    this.router.navigate(['/']);
  }

  togglePasswordType = () => {
    this.passwordType = !this.passwordType;
  }

  loginUser(event: Event) {
    if (!this.initializeValidation()) {
      return;
    }

    event.preventDefault();
    const userCred = new UserProfile(
      '',
      this.userCredentials.value.userEmail!,
      this.userCredentials.value.userPassword!
    );
    this.userService.loginUser(userCred).subscribe(
      (response) => {
        sessionStorage.setItem('user_id', response.id?.toString()!);
        sessionStorage.setItem('user_name', response.userName);
        sessionStorage.setItem('user_email', response.userEmail);
        this.userProfileService.toggleLogInStatus();

        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Login Successful',
          showConfirmButton: false,
          timer: 1500,
        });

        this.router.navigate(['/']);
      },
      (error) => {
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: "Invalid Login Credentials",
        });
      }
    );
  }

  initializeValidation() {
    const loginEmailNode: HTMLElement | null =
      document.getElementById('userEmail');

    let isLoginValid: boolean = true;

    // Reset error messages
    (document.getElementById('emailError') as HTMLElement).textContent = '';
    (document.getElementById('passwordError') as HTMLElement).textContent = '';

    // Validate email
    const email: string = (
      document.getElementById('userEmail') as HTMLInputElement
    ).value.trim();
    const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      loginEmailNode?.classList.add('error_effect');
      (document.getElementById('emailError') as HTMLElement).textContent =
        '*Please enter a valid email address';
      isLoginValid = false;
    } else {
      loginEmailNode?.classList.remove('error_effect');
    }
    return isLoginValid;
  }
}
