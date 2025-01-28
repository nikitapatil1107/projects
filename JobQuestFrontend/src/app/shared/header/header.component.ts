import { Component, HostListener } from '@angular/core';
import { Company } from '../../models/companyModel/company';
import { UserProfileService } from '../../services/user-profile.service';
import { Event } from '../../models/eventModel/event';
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
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  isUserLoggedIn: boolean = false;
  isDropdownOpen: boolean = false;
  loading: boolean = true;
  companiesList: Company[] = [];
  eventsList: Event[] = [];
  activeLink: string = "home";

  constructor(
    private userService: UserProfileService,
    private router: Router
  ) {}
  ngOnInit() {
    this.isUserLoggedIn = this.getUserLoggedInStatusData();
  }

  onCompanyClicked = () => {
    this.setActiveLink("companies");
    this.router.navigate(['/companyList']);
  };

  isUserLoggedInOutputFn = (loggedIn: boolean) => {
    this.isUserLoggedIn = loggedIn;
  };

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
        this.isUserLoggedIn = false;
        this.router.navigate(['/']);

        Swal.fire({
          title: 'Logged Out!',
          text: 'You have been logged out successfully.',
          icon: 'success',
        });
      }
    });
  };

  setActiveLink = (url: string) => {
    this.activeLink = url;
  }

  navigateToLoginPage = () => {
    this.router.navigate(['employee/login']);
  };

  navigateToRegisterPage = () => {
    this.router.navigate(['employee/register']);
  };

  getUserLoggedInStatusData = (): boolean => {
    return this.userService.getLoginStatus();
  };

  onRoutingHome = () => {
    this.setActiveLink("home");
    this.router.navigate(['/']);
  };

  appliedJobs = () => {
    this.isDropdownOpen = !this.isDropdownOpen;
    this.router.navigate(['/appliedJobs'], {
      queryParams: { forJobs: 'jobs' },
    });
  };

  appliedEvents = () => {
    this.isDropdownOpen = !this.isDropdownOpen;
    this.router.navigate(['/appliedJobs'], {
      queryParams: { forEvents: 'events' },
    });
  };

  savedEvents = () => {
    this.isDropdownOpen = !this.isDropdownOpen;
    this.router.navigate(['/employee/savedJobs']);
  }

  resetPassword = () => {
    this.isDropdownOpen = !this.isDropdownOpen;
    this.router.navigate(['/employee/changePassword']);
  };

  profileRouting(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
    this.router.navigate(['/employee/userProfile']);
  }

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  employerRegister = () => {
    this.isDropdownOpen = !this.isDropdownOpen;
    this.router.navigate(['/employer/companyRegister']);
  };

  employerLogin = () => {
    this.isDropdownOpen = !this.isDropdownOpen;
    this.router.navigate(['/employer/companyLogin']);
  };

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    const clickedElement = event.target as HTMLElement;
    if (!clickedElement.closest('.profile-dropdown-container')) {
      this.isDropdownOpen = false;
    }
  }
}
