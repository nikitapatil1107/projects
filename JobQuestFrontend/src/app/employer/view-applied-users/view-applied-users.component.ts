import { Component } from '@angular/core';
import { EmployerCompanyService } from '../../services/employer-company.service';
import { EmployerJobService } from '../../services/employer-job.service';
import { UserAppliedJob } from '../../models/user-applied-job';
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
  selector: 'app-view-applied-users',
  templateUrl: './view-applied-users.component.html',
  styleUrl: './view-applied-users.component.css',
})
export class ViewAppliedUsersComponent {
  companyId: number = 0;
  isAllListActive: boolean = false;
  userAppliedJob: UserAppliedJob[] = [];
  constructor(
    private customerService: EmployerCompanyService,
    private jobService: EmployerJobService,
    private router: Router
  ) {}

  ngOnInit() {
    this.companyId = this.customerService.getCompanyId();
    if (this.companyId > 0) {
      this.jobService
        .getAppliedUsersOfCompany(this.companyId)
        .subscribe((response) => {
          this.userAppliedJob = response;
          this.userAppliedJob.forEach((user) => {
            if (!user.jobDataActive) {
              this.isAllListActive = true;
            }
          });
        });
    }
  }

  onAcceptClicked = (userEmail: string, jobName: string) => {
    Toast.fire({
      icon: 'success',
      title: 'Email Succesfully Sent!',
    });
    this.jobService.getAcceptEmail(userEmail, jobName).subscribe((response) => {
    });
  };

  onRejectClicked = (
    userEmail: string,
    jobName: string,
    userId: number,
    jobId: number,
    index: number
  ) => {
    Toast.fire({
      icon: 'success',
      title: 'Email Succesfully Sent!',
    });
    this.jobService.getRejectEmail(userEmail, jobName).subscribe((response) => {
      this.userAppliedJob.splice(index, 1);
      this.userAppliedJob.forEach((user) => {
        if (!user.jobDataActive) {
          this.isAllListActive = true;
        }
      });
      this.jobService
        .removeAppliedUser(jobId, this.companyId, userId)
        .subscribe((data) => {
        });
    });
  };

  onViewProfileRouting = (userId: number) => {
    this.router.navigate(['/employer/overview-user'], {
      queryParams: { userId: userId },
    });
  };

  onGetPdf(userId: number): void {
    this.jobService.getPdfOfUser(userId).subscribe(
      (data: ArrayBuffer) => {
        const blob = new Blob([data], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        window.open(url);
      },
      (error: any) => {
        console.error('Failed to fetch PDF:', error);
        // Handle error
      }
    );
  }
}
