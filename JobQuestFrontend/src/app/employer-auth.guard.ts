import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthGuardService } from './services/auth-guard.service';

@Injectable({
  providedIn: 'root'
})
export class EmployerAuthGuard implements CanActivate {
  constructor(private authService: AuthGuardService, private router: Router) {}

  canActivate(): boolean {
    if (!this.authService.isLoggedIn() || !this.authService.isEmployer()) {
      this.router.navigate(['/employer/companyRegister']);
      return false;
    }
    return true;
  }
}
