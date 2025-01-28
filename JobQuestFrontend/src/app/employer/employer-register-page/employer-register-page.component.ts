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
  selector: 'app-employer-register-page',
  templateUrl: './employer-register-page.component.html',
  styleUrl: './employer-register-page.component.css',
})
export class EmployerRegisterPageComponent {
  document: Document = new Document();
  passwordType: boolean = false;

  constructor(
    private companyAuth: CompanyAuthService,
    private router: Router
  ) {}

  employer = new FormGroup({
    companyName: new FormControl('', [
      Validators.required,
      Validators.pattern('[a-z A-Z]+$'),
    ]),
    companyEmail: new FormControl('', [Validators.required, Validators.email]),
    companyPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
    companyContactName: new FormControl('', [
      Validators.required,
      Validators.pattern('[a-z A-Z]+$'),
    ]),
    companyContactNo: new FormControl('', [Validators.required]),
  });

  onRoutingHome() {
    this.router.navigate(['/']);
  }

  togglePasswordType = () => {
    this.passwordType = !this.passwordType;
  }

  registerCompany = (event: Event) => {
    if (!this.initializeValidation()) {
      return;
    }

    event.preventDefault();

    const newCompany = new Company();
    newCompany.compName = this.employer.value.companyName!;
    newCompany.compEmail = this.employer.value.companyEmail!;
    newCompany.compPassword = this.employer.value.companyPassword!;
    newCompany.compContactName = this.employer.value.companyContactName!;
    newCompany.compContactNo = this.employer.value.companyContactNo!;

    this.companyAuth.registerCompany(newCompany).subscribe(
      (response) => {
        sessionStorage.setItem('comp_id', response.compId?.toString()!);
        sessionStorage.setItem('comp_email', response.compEmail!);

        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Registration Successful!',
          showConfirmButton: false,
          timer: 1500,
        });

        this.router.navigate(['/employer/companyForm']);
      },
      (error) => {
        if (error.status == 406) {
          Swal.fire({
            icon: "error",
            title: "Registration Failed",
            text: "Domain Already Exist!",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Registration Failed",
            text: "Internal Server Error",
          });
        }
      }
    );
  };

  initializeValidation(): boolean {
    if (typeof document == 'undefined') {
      return true;
    }

    const companyNameNode: HTMLElement | null =
      document.getElementById('companyName');
    const emailNode: HTMLElement | null =
      document.getElementById('companyEmail');

    let isRegisterValid: boolean = true;

    // Reset error messages
    (document.getElementById('nameError') as HTMLElement).textContent = '';
    (document.getElementById('emailError') as HTMLElement).textContent = '';
    (document.getElementById('passwordError') as HTMLElement).textContent = '';
    (document.getElementById('contactNameError') as HTMLElement).textContent =
      '';
    (document.getElementById('contactError') as HTMLElement).textContent = '';

    // Validate username
    const companyName: string = (
      document.getElementById('companyName') as HTMLInputElement
    ).value.trim();
    if (companyName === '') {
      companyNameNode?.classList.add('error_effect');
      (document.getElementById('nameError') as HTMLElement).textContent =
        '*Please enter company name';
      isRegisterValid = false;
    } else {
      companyNameNode?.classList.remove('error_effect');
    }

    // Validate email
    const email: string = (
      document.getElementById('companyEmail') as HTMLInputElement
    ).value.trim();
    const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const forbiddenDomains: string[] = ['gmail', 'yahoo', 'hotmail'];

    if (!emailRegex.test(email)) {
      emailNode?.classList.add('error_effect');
      (document.getElementById('emailError') as HTMLElement).textContent =
        '*Please enter a valid organization email address';
      isRegisterValid = false;
    } else if (
      forbiddenDomains.some((domain) => email.includes(`@${domain}`))
    ) {
      emailNode?.classList.add('error_effect');
      (document.getElementById('emailError') as HTMLElement).textContent =
        '*Invalid Domain. Please enter a valid organization email address.';
      isRegisterValid = false;
    } else {
      emailNode?.classList.remove('error_effect');
    }
    // Validate password
    const password: string = (
      document.getElementById('companyPassword') as HTMLInputElement
    ).value;
    const passwordRegex: RegExp =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[^\w\d]).{8,}$/;
    if (!passwordRegex.test(password)) {
      (document.getElementById('companyPassword') as HTMLElement).classList.add(
        'error_effect'
      );
      (document.getElementById('passwordError') as HTMLElement).textContent =
        '*Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character';
      isRegisterValid = false;
    } else {
      (
        document.getElementById('companyPassword') as HTMLElement
      ).classList.remove('error_effect');
    }

    // validate company contact number
    const companyContactName: string = (
      document.getElementById('companyContactName') as HTMLInputElement
    ).value.trim();
    if (companyContactName === '') {
      companyNameNode?.classList.add('error_effect');
      (document.getElementById('contactNameError') as HTMLElement).textContent =
        '*Please enter company contact name';
      isRegisterValid = false;
    } else {
      companyNameNode?.classList.remove('error_effect');
    }

    // Validate contact number
    const contact: string = (
      document.getElementById('companyContactNo') as HTMLInputElement
    ).value.trim();
    const contactRegex: RegExp = /^\d{10}$/;
    if (!contactRegex.test(contact)) {
      (
        document.getElementById('companyContactNo') as HTMLElement
      ).classList.add('error_effect');
      (document.getElementById('contactError') as HTMLElement).textContent =
        '*Please enter a valid 10-digit contact number';
      isRegisterValid = false;
    } else {
      (
        document.getElementById('companyContactNo') as HTMLElement
      ).classList.remove('error_effect');
    }

    return isRegisterValid;
  }
}
