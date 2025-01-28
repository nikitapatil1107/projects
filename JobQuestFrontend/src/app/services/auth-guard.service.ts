import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService {
  constructor() {}

  isLoggedIn(): boolean {
    // Check if user is logged in
    if (typeof sessionStorage !== 'undefined') {
      return (
        sessionStorage.getItem('user_id') !== null ||
        sessionStorage.getItem('comp_id') !== null
      );
    }
    return false;
  }

  isEmployee(): boolean {
    // Check if user is an employee
    if (typeof sessionStorage !== 'undefined') {
      return sessionStorage.getItem('user_id') !== null;
    }
    return false;
  }

  isEmployer(): boolean {
    // Check if user is an employer
    if (typeof sessionStorage !== 'undefined') {
      return sessionStorage.getItem('comp_id') !== null;
    }
    return false;
  }
}
