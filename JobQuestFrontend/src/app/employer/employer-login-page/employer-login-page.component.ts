import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Company } from '../../models/companyModel/company';
import { CompanyAuthService } from '../../services/employer/company-auth.service';
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
  selector: 'app-employer-login-page',
  templateUrl: './employer-login-page.component.html',
  styleUrl: './employer-login-page.component.css',
})
export class EmployerLoginPageComponent {
  document: Document = new Document();
  passwordType: boolean = false;

  constructor(
    private companyAuth: CompanyAuthService,
    private router: Router
  ) {}

  companyCredentials = new FormGroup({
    companyEmail: new FormControl('', [Validators.required, Validators.email]),
    comapnyPassword: new FormControl('', []),
  });

  onRoutingHome() {
    this.router.navigate(['/']);
  }

  togglePasswordType = () => {
    this.passwordType = !this.passwordType;
  }

  loginEmployer = (event: Event) => {
    if (!this.initializeValidation()) {
      return;
    }

    event.preventDefault();

    const employerCred = new Company();
    employerCred.compEmail = this.companyCredentials.value.companyEmail!;
    employerCred.compPassword = this.companyCredentials.value.comapnyPassword!;


    this.companyAuth.loginCompany(employerCred).subscribe(
      (response) => {
        sessionStorage.setItem('comp_id', response.compId?.toString()!);
        sessionStorage.setItem('comp_email', response.compEmail!);

        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Login Successful!',
          showConfirmButton: false,
          timer: 1500,
        });

        this.router.navigate(['employer/employerDashboard']);
      },
      (error) => {
        if (error.status == 406) {
          Swal.fire({
            icon: 'error',
            title: 'Login Failed',
            text: 'Domain does not Exist!',
          });
        } else if (error.status == 401) {
          Swal.fire({
            icon: 'error',
            title: 'Login Failed',
            text: 'Invalid Login Credentials',
          });
        }
      }
    );
  };

  initializeValidation() {
    const loginEmailNode: HTMLElement | null =
      document.getElementById('companyEmail');

    let isLoginValid: boolean = true;

    // Reset error messages
    (document.getElementById('emailError') as HTMLElement).textContent = '';
    (document.getElementById('passwordError') as HTMLElement).textContent = '';

    // Validate email
    const email: string = (
      document.getElementById('companyEmail') as HTMLInputElement
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
