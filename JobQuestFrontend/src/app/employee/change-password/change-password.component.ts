import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
import { UserService } from '../../services/employee/user.service';
import { ActivatedRoute, Router } from '@angular/router';

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
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css'
})

export class ChangePasswordComponent {

  userEmail:string = "";
  oldPasswordType: boolean = false;
  newPasswordType: boolean = false;
  confirmPasswordType: boolean = false;

  passwordCredentials = new FormGroup({
    oldPassword: new FormControl('', []),
    newPassword: new FormControl('', []),
    confirmPassword: new FormControl('', []),
  });

  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      if(typeof sessionStorage !== 'undefined') {
        this.userEmail = sessionStorage.getItem("user_email")!;
      }
    });
  }

  toggleOldPasswordType = () => {
    this.oldPasswordType = !this.oldPasswordType;
  }

  toggleNewPasswordType = () => {
    this.newPasswordType = !this.newPasswordType;
  }

  toggleConfirmPasswordType = () => {
    this.confirmPasswordType = !this.confirmPasswordType;
  }

  passwordReset(event: Event) {
    event.preventDefault();

    const oldPassword = this.passwordCredentials.value.oldPassword;
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
      userPassword: oldPassword,
      newPassword: newPassword
    }

    this.userService.changePassword(userInfo).subscribe((response) => {
      if(response)
      {
        Toast.fire({
          icon: 'success',
          title: 'Password changed successfully !',
        });

        this.passwordCredentials = new FormGroup({
          oldPassword: new FormControl('', []),
          newPassword: new FormControl('', []),
          confirmPassword: new FormControl('', []),
        });
      } else {
        Toast.fire({
          icon: 'error',
          title: 'Operation failed !',
        });
      }
    })
  }
}
