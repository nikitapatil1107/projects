import { Component, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JobService } from '../../services/job.service';
import { JobDetailInfoModel } from '../../models/job-detail-info-model';
import { SavedJobs } from '../../models/savedJobs/saved-jobs';
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
  selector: 'app-list-of-jobs',
  templateUrl: './list-of-jobs.component.html',
  styleUrl: './list-of-jobs.component.css',
})
export class ListOfJobsComponent {
  id: number = 0;
  queryParams: any;
  compIdTextBool: boolean = false;
  companyData: any = {};
  SelectedJobWorkMode: string[] = [];
  selectedIndustryType: string[] = [];
  selectedDepartment: string[] = [];
  selectedJobType: string[] = [];
  filteredJobs: any[] = [];
  selectedCompanyTypes: string[] = [];
  jobs: JobDetailInfoModel[] = []; // Assuming this is the type of your jobs data
  saved: any = {};
  userId: number = 0;

  constructor(
    private route: ActivatedRoute,
    private jobService: JobService,
    private router: Router,
    private elementRef: ElementRef
  ) {}

  ngOnInit() {
    this.userId = parseInt(sessionStorage.getItem('user_id')!);

    this.route.queryParams.subscribe((params) => {
      this.queryParams = params;

      if (Object.keys(params).length === 0) {
        // No query parameters exist, call API to get all jobs
        this.jobService.getAllJobs().subscribe((data: JobDetailInfoModel[]) => {
          this.jobs = data;
          this.filteredJobs = data;

          for (let job of this.jobs) {
            this.saved[job.jobId] = false;
          }

          if (this.userId) {
            // Saved Jobs request
            this.jobService.getSavedJobs(this.userId).subscribe((response) => {
              for (let job of response) {
                this.saved[job.jobId] = true;
              }
            });
          }
        });
      } else if (Object.keys(params).length !== 0) {
        // Query parameters exist, call API to get jobs by job name tag
        if (params['tagName']) {
          const tagName = params['tagName'];

          this.jobService.getJobsByTagName(tagName).subscribe((data: any[]) => {
            this.jobs = data;

            for (let job of this.jobs) {
              this.saved[job.jobId] = false;
            }
  
            if (this.userId) {
              // Saved Jobs request
              this.jobService.getSavedJobs(this.userId).subscribe((response) => {
                for (let job of response) {
                  this.saved[job.jobId] = true;
                }
              });
            }
          });
        } else if (params['compId']) {
          const compId = params['compId'];
          this.jobService.getJobsOfCompany(compId).subscribe((data) => {
            this.companyData = data;
            this.jobs = data.jobs;
            this.filteredJobs = data.jobs;
            this.compIdTextBool = true;

            for (let job of this.jobs) {
              this.saved[job.jobId] = false;
            }
  
            if (this.userId) {
              // Saved Jobs request
              this.jobService.getSavedJobs(this.userId).subscribe((response) => {
                for (let job of response) {
                  this.saved[job.jobId] = true;
                }
              });
            }
          });
        } else {
          const jobName = params['jobName'];

          this.jobService.getJobsByJobName(jobName).subscribe((data: any[]) => {
            this.jobs = data;
            this.filteredJobs = data;

            for (let job of this.jobs) {
              this.saved[job.jobId] = false;
            }
  
            if (this.userId) {
              // Saved Jobs request
              this.jobService.getSavedJobs(this.userId).subscribe((response) => {
                for (let job of response) {
                  this.saved[job.jobId] = true;
                }
              });
            }
          });
        }
      }
    });
  }

  addBookmark(jobId: number): void {
    const savedJobInfo: SavedJobs = {
      userId: this.userId,
      jobId: jobId,
    };

    this.jobService.saveJob(savedJobInfo).subscribe((response) => {
      this.saved[jobId] = true;
      Toast.fire({
        icon: 'success',
        title: 'Bookmark Added !',
      });
    });
  }

  removeBookmark(jobId: number): void {
    this.jobService.removeSavedJob(this.userId, jobId).subscribe((response) => {
      this.saved[jobId] = false;
      Toast.fire({
        icon: 'success',
        title: 'Bookmark Removed !',
      });
    });
  }

  removeAllFilters(): void {
    this.selectedCompanyTypes = []; // Clear selected company types
    this.SelectedJobWorkMode = []; // Clear selected job work modes
    this.selectedIndustryType = []; //Clear selected industry types
    this.selectedDepartment = []; //Clear selected department types
    this.selectedJobType = []; //Clear selected job types
    this.jobs = [...this.filteredJobs];
  }

  toggleSelectedCompanyType(value: string): void {
    if (this.selectedCompanyTypes.includes(value)) {
      this.selectedCompanyTypes = this.selectedCompanyTypes.filter(
        (val) => val !== value
      );
    } else {
      this.selectedCompanyTypes.push(value);
    }
  }

  toggleSelectedJobWorkMode(value: string): void {
    if (this.SelectedJobWorkMode.includes(value)) {
      this.SelectedJobWorkMode = this.SelectedJobWorkMode.filter(
        (val) => val !== value
      );
    } else {
      this.SelectedJobWorkMode.push(value);
    }
  }

  toggleSelectedIndustryType(value: string): void {
    if (this.selectedIndustryType.includes(value)) {
      this.selectedIndustryType = this.selectedIndustryType.filter(
        (val) => val !== value
      );
    } else {
      this.selectedIndustryType.push(value);
    }
  }

  toggleSelectedDepartment(value: string): void {
    if (this.selectedDepartment.includes(value)) {
      this.selectedDepartment = this.selectedDepartment.filter(
        (val) => val !== value
      );
    } else {
      this.selectedDepartment.push(value);
    }
  }

  toggleSelectedJobType(value: string): void {
    if (this.selectedJobType.includes(value)) {
      this.selectedJobType = this.selectedJobType.filter(
        (val) => val !== value
      );
    } else {
      this.selectedJobType.push(value);
    }
  }

  filterJobsByCompanyType() {
    if (this.selectedCompanyTypes.length === 0) {
      // this.jobs = this.filteredJobs;
      return;
    }

    this.jobs = this.jobs.filter((job) => {
      return this.selectedCompanyTypes.includes(job.compType);
    });
    const element =
      this.elementRef.nativeElement.querySelector(`#scrollToFirstBlock`);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest',
      });
    }
  }

  filterJobsByWorkMode() {
    if (this.SelectedJobWorkMode.length === 0) {
      // this.jobs = this.filteredJobs;
      return;
    }

    this.jobs = this.jobs.filter((job) => {
      return this.SelectedJobWorkMode.includes(job.workMode);
    });
    const element =
      this.elementRef.nativeElement.querySelector(`#scrollToFirstBlock`);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest',
      });
    }
  }

  filterJobsByIndustryType() {
    if (this.selectedIndustryType.length === 0) {
      // this.jobs = this.filteredJobs;
      return;
    }

    this.jobs = this.jobs.filter((job) => {
      return this.selectedIndustryType.includes(job.industryType);
    });
    const element =
      this.elementRef.nativeElement.querySelector(`#scrollToFirstBlock`);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest',
      });
    }
  }

  filterJobsByDepartment() {
    if (this.selectedDepartment.length === 0) {
      // this.jobs = this.filteredJobs;
      return;
    }

    this.jobs = this.jobs.filter((job) => {
      return this.selectedDepartment.includes(job.department);
    });
    const element =
      this.elementRef.nativeElement.querySelector(`#scrollToFirstBlock`);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest',
      });
    }
  }

  filterJobsByJobType() {
    if (this.selectedJobType.length === 0) {
      // this.jobs = this.filteredJobs;
      return;
    }

    this.jobs = this.jobs.filter((job) => {
      return this.selectedJobType.includes(job.jobName);
    });
    const element =
      this.elementRef.nativeElement.querySelector(`#scrollToFirstBlock`);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest',
      });
    }
  }

  onRouteSingleJob = (jobId: number) => {
    this.router.navigate([`/singleJob`], { queryParams: { jobId: jobId } });
  };
}
