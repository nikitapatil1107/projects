import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'JobQuestFrontend';

  constructor(private router: Router) {}

  shouldRenderComponent = () => {
    if (
      this.router.url === '/employee/register' ||
      this.router.url === '/employee/login' ||
      this.router.url === '/employee/verifyEmail' ||
      this.router.url.includes('/employee/resetPassword') ||
      this.router.url === '/employer/companyLogin' ||
      this.router.url === '/employer/companyRegister' ||
      this.router.url === '/employer/companyForm' ||
      this.router.url.includes('/employer/jobForm') ||
      this.router.url.includes('/employer/viewApplication') ||
      this.router.url.includes('/employer/employerDashboard') ||
      this.router.url.includes('/employer/overview-user')
    ) {
      return false;
    } else {
      return true;
    }
  };
}
