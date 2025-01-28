import { Component, HostListener } from '@angular/core';
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
  selector: 'app-employer-header',
  templateUrl: './employer-header.component.html',
  styleUrl: './employer-header.component.css',
})
export class EmployerHeaderComponent {
  isDropdownOpen: boolean = false;
  loading: boolean = true;

  constructor(private router: Router) {}
  
  logout = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will be logged out from your account!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Logout',
    }).then((result) => {
      if (result.isConfirmed) {
        this.isDropdownOpen = false;
        sessionStorage.clear();
        this.router.navigate(['/'], { replaceUrl: true, skipLocationChange: false });

        Swal.fire({
          title: 'Logged Out!',
          text: 'You have been logged out successfully.',
          icon: 'success',
        });
      }
    });
  };

  onRoutingEmployerHome = () => {
    this.router.navigate(['/employer/employerDashboard']);
  };

  onRoutingToAddJobs = () => {
    this.router.navigate(['/employer/jobForm']);
  };

  onRoutingCompany = () => {
    this.router.navigate(['/employer/companyForm']);
  };

  onViewApplicationRouting = () => {
    this.router.navigate(['/employer/viewApplication']);
  };

  resetPassword = () => {
    this.isDropdownOpen = !this.isDropdownOpen;
    this.router.navigate(['/employee/resetPassword']);
  };

  profileRouting(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
    this.router.navigate(['/employee/userProfile']);
  }

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    const clickedElement = event.target as HTMLElement;
    if (!clickedElement.closest('.profile-dropdown-container')) {
      this.isDropdownOpen = false;
    }
  }
}
