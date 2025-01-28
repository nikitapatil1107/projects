import { Component } from '@angular/core';
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
  selector: 'app-app-feedback',
  templateUrl: './app-feedback.component.html',
  styleUrl: './app-feedback.component.css',
})
export class AppFeedbackComponent {
  email: string = 'chinmay@test.com';
  userName: string = '';
  constructor(private router: Router, private userService: UserProfileService) {}

  ngOnInit() {
    this.email = this.userService.getEmailOfLoggedInUser();
    this.userName = this.userService.getNameOfLoggedInUser();
  }

  onRoutingHome = () => {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Feedback Submitted Successfuly!',
      showConfirmButton: false,
      timer: 1500,
    });
    this.router.navigate(['/']);
  };
}
