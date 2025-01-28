import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/employee/user.service';
import { response } from 'express';
import { ActivatedRoute, Route, Router } from '@angular/router';
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
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css',
})
export class ResetPasswordComponent {
  passwordCredentials = new FormGroup({
    newPassword: new FormControl('', []),
    confirmPassword: new FormControl('', []),
  });

  userEmail: string = '';
  newPasswordType: boolean = false;
  confirmPasswordType: boolean = false;

  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.userEmail = params['userEmail'];
    });
  }

  toggleNewPasswordType = () => {
    this.newPasswordType = !this.newPasswordType;
  }

  toggleConfirmPasswordType = () => {
    this.confirmPasswordType = !this.confirmPasswordType;
  }

  passwordReset(event: Event) {
    event.preventDefault();

    const newPassword = this.passwordCredentials.value.newPassword;
    const confirmPassword = this.passwordCredentials.value.confirmPassword;

    if(newPassword !== confirmPassword) {
      Toast.fire({
        icon: 'warning',
        title: 'Entered Passwords are not same !',
      });

      return;
    }

    const userInfo = {
      userEmail: this.userEmail,
      userPassword: newPassword
    }

    this.userService.resetPassword(userInfo!).subscribe((response) => {
      if(response)
      {
        Toast.fire({
          icon: 'success',
          title: 'Password reset successful !',
        });
        this.router.navigate(['employee/login']);
      } else {
        Toast.fire({
          icon: 'error',
          title: 'Password reset failed !',
        });
      }
    })
  }
}
