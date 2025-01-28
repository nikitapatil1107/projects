import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserProfile } from '../../models/userProfile/user-profile';
import { UserService } from '../../services/employee/user.service';
import Swal from 'sweetalert2';

const Toast = Swal.mixin({
  toast: true,
  position: 'top',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  width: "500px",
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  },
});

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css',
})
export class RegisterPageComponent {
  document: Document = new Document();
  passwordType: boolean = false;

  constructor(private userService: UserService, private router: Router) {}

  user = new FormGroup({
    userName: new FormControl('', [
      Validators.required,
      Validators.pattern('[a-z A-Z]+$'),
    ]),
    userEmail: new FormControl('', [Validators.required, Validators.email]),
    userPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
    userContactNo: new FormControl('', [Validators.required]),
  });

  ngAfterViewInit() {
    if (typeof document !== 'undefined') {
      this.initializeJs();
    }
  }

  onRoutingHome() {
    this.router.navigate(['/']);
  }

  togglePasswordType = () => {
    this.passwordType = !this.passwordType;
  }

  registerUser = (event: Event) => {
    if (!this.initializeValidation()) {
      return;
    }

    event.preventDefault();
    const newUser = new UserProfile(
      this.user.value.userName!,
      this.user.value.userEmail!,
      this.user.value.userPassword!,
      this.user.value.userContactNo!
    );

    this.userService.registerUser(newUser).subscribe(
      (response) => {
        sessionStorage.setItem('user_id', response.id?.toString()!);
        sessionStorage.setItem('user_name', response.userName);
        sessionStorage.setItem('user_email', response.userEmail);

        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Registration Successful!',
          showConfirmButton: false,
          timer: 1500,
        });

        this.router.navigate(['/']);
      },
      (error) => {
        if (error.status == 400) {
          Toast.fire({
            icon: 'warning',
            title: `Email ${this.user.value.userEmail} already exists!`,
          });
        } else {
          Toast.fire({
            icon: 'error',
            title: 'User Registration Failed!',
          });
        }


      }
    );
  };

  initializeValidation(): boolean {
    if (typeof document == 'undefined') {
      return true;
    }

    const userNameNode: HTMLElement | null =
      document.getElementById('userName');
    const emailNode: HTMLElement | null = document.getElementById('userEmail');

    let isRegisterValid: boolean = true;

    // Reset error messages
    (document.getElementById('nameError') as HTMLElement).textContent = '';
    (document.getElementById('emailError') as HTMLElement).textContent = '';
    (document.getElementById('passwordError') as HTMLElement).textContent = '';
    (document.getElementById('contactError') as HTMLElement).textContent = '';

    // Validate username
    const username: string = (
      document.getElementById('userName') as HTMLInputElement
    ).value.trim();
    if (username === '') {
      userNameNode?.classList.add('error_effect');
      (document.getElementById('nameError') as HTMLElement).textContent =
        '*Please enter your name';
      isRegisterValid = false;
    } else {
      userNameNode?.classList.remove('error_effect');
    }

    // Validate email
    const email: string = (
      document.getElementById('userEmail') as HTMLInputElement
    ).value.trim();
    const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      emailNode?.classList.add('error_effect');
      (document.getElementById('emailError') as HTMLElement).textContent =
        '*Please enter a valid email address';
      isRegisterValid = false;
    } else {
      emailNode?.classList.remove('error_effect');
    }

    // Validate password
    const password: string = (
      document.getElementById('userPassword') as HTMLInputElement
    ).value;
    const passwordRegex: RegExp =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[^\w\d]).{8,}$/;
    if (!passwordRegex.test(password)) {
      (document.getElementById('userPassword') as HTMLElement).classList.add(
        'error_effect'
      );
      (document.getElementById('passwordError') as HTMLElement).textContent =
        '*Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character';
      isRegisterValid = false;
    } else {
      (document.getElementById('userPassword') as HTMLElement).classList.remove(
        'error_effect'
      );
    }

    // Validate contact number
    const contact: string = (
      document.getElementById('userContactNo') as HTMLInputElement
    ).value.trim();
    const contactRegex: RegExp = /^\d{10}$/;
    if (!contactRegex.test(contact)) {
      (document.getElementById('userContactNo') as HTMLElement).classList.add(
        'error_effect'
      );
      (document.getElementById('contactError') as HTMLElement).textContent =
        '*Please enter a valid 10-digit contact number';
      isRegisterValid = false;
    } else {
      (
        document.getElementById('userContactNo') as HTMLElement
      ).classList.remove('error_effect');
    }
    return isRegisterValid;
  }

  initializeJs() {
    const card1: HTMLElement | null = document.getElementById('card1');
    const card2: HTMLElement | null = document.getElementById('card2');
    const hiddenInput: HTMLInputElement | null = document.getElementById(
      'selectedCard'
    ) as HTMLInputElement;

    const userNameNode: HTMLElement | null =
      document.getElementById('userName');
    const emailNode: HTMLElement | null = document.getElementById('userEmail');

    if (card1 && card2 && hiddenInput && userNameNode && emailNode) {
      card1.addEventListener('click', function () {
        card1.classList.add('clicked');
        card2.classList.remove('clicked');
        hiddenInput.value = 'professional';
      });

      card2.addEventListener('click', function () {
        card2.classList.add('clicked');
        card1.classList.remove('clicked');
        hiddenInput.value = 'student';
      });
    }
  }
}
