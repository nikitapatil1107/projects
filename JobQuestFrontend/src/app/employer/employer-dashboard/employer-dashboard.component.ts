import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { EmployerCompanyService } from '../../services/employer-company.service';
import { EmployerJobService } from '../../services/employer-job.service';
import { Company } from '../../models/companyModel/company';
import { JobDetailInfoModel } from '../../models/job-detail-info-model';
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
  selector: 'app-employer-dashboard',
  templateUrl: './employer-dashboard.component.html',
  styleUrl: './employer-dashboard.component.css',
})
export class EmployerDashboardComponent {
  @Input() isActive: boolean = true;
  companyId: number = 0;
  companyProfileData: Company = new Company();
  allJobsOfCompany: JobDetailInfoModel[] = [];
  constructor(
    private companyService: EmployerCompanyService,
    private jobService: EmployerJobService,
    private router: Router
  ) {}

  ngOnInit() {
    this.companyId = this.companyService.getCompanyId();
    if (this.companyId > 0) {
      this.companyService
        .getCompanyProfileData(this.companyId)
        .subscribe((response) => {
          this.companyProfileData = response;
          this.jobService
            .getAllJobsOfCompany(this.companyId)
            .subscribe((response) => {
              this.allJobsOfCompany = response;
              this.allJobsOfCompany.sort((a, b) => {
                if (a.jobActive && !b.jobActive) {
                  return -1;
                }
                if (!a.jobActive && b.jobActive) {
                  return 1;
                }
                return 0;
              });
            });
        });
    }
  }

  onEditCompanyDetailRouting = () => {
    this.router.navigate(['/employer/companyForm']);
  };

  onAddJobsForCompanyRouting = () => {
    this.router.navigate(['/employer/jobForm']);
  };

  onJobEditRouting = (jobId: number) => {
    this.router.navigate(['/employer/jobForm'], {
      queryParams: { jobId: jobId },
    });
  };

  onJobDelete = (jobData: JobDetailInfoModel) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This job will be permanently Deleted!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Delete',
    }).then((result) => {
      if (result.isConfirmed) {
        this.jobService.deleteJobById(jobData.jobId).subscribe((response) => {
          this.allJobsOfCompany = this.allJobsOfCompany.filter((job) => {
            return job.jobId !== jobData.jobId;
          });
          Swal.fire({
            title: `${jobData.jobName} Job Deleted!`,
            text: `You have deleted the job ${jobData.jobName}.`,
            icon: 'success',
          });
        });
      }
    });
  };

  toggleJobIsActiveStatus(job: JobDetailInfoModel) {
    // eve.stopPropagation();
    job.jobActive = !job.jobActive;
    this.jobService
      .toggleJobIsActiveStatus(job.jobId, job.jobActive)
      .subscribe((response) => {
        // Find the index of the toggled job in the array
        const index = this.allJobsOfCompany.findIndex(
          (j) => j.jobId === job.jobId
        );
        // Remove the job from its current position in the array
        this.allJobsOfCompany.splice(index, 1);
        if (response.jobActive) {
          // Push the toggled job to the start of the array
          this.allJobsOfCompany.unshift(job);
          Toast.fire({
            icon: 'success',
            title: `${job.jobName} Job is set to Active!`,
          });
        } else {
          // Push the toggled job to the end of the array
          this.allJobsOfCompany.push(job);
          Toast.fire({
            icon: 'success',
            title: `${job.jobName} Job is set to Inactive!`,
          });
        }
      });
  }
}
