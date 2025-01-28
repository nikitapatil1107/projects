import { Component, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JobService } from '../../services/job.service';

@Component({
  selector: 'app-job-search',
  templateUrl: './job-search.component.html',
  styleUrl: './job-search.component.css',
})
export class JobSearchComponent {
  company: any[] = [];
  jobs: any[] = [];
  event: any[] = [];
  SelectedJobWorkMode: string[] = [];
  selectedIndustryType: string[] = [];
  selectedDepartment: string[] = [];
  selectedJobType: string[] = [];
  filteredJobs: any[] = [];
  selectedCompanyTypes: string[] = [];
  searchQuery: string = '';

  constructor(
    private jobService: JobService,
    private route: ActivatedRoute,
    private elementRef: ElementRef
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      if (params['searchText']) {
        this.searchQuery = params['searchText'];
        this.searchJobs();
      }
    });
  }

  searchJobs(): void {
    if (this.searchQuery.trim() === '') {
      // Handle empty search query
      this.company = [];
      this.jobs = [];
      this.event = [];
      return;
    }

    this.jobService.searchCompanyByName(this.searchQuery).subscribe(
      (companyResponse: any[]) => {
        this.company = companyResponse;
        this.jobs = [];
        this.event = [];
      },
      (error: any) => {
        console.error('Error fetching company details:', error);
      }
    );

    this.jobService.searchJobsByName(this.searchQuery).subscribe(
      (jobsResponse: any[]) => {
        this.jobs = jobsResponse;
        this.filteredJobs = jobsResponse;
        this.company = [];
        this.event = [];
      },
      (error: any) => {
        console.error('Error fetching job details:', error);
      }
    );

    this.jobService.searchEventByName(this.searchQuery).subscribe(
      (eventResponse: any[]) => {
        this.event = eventResponse;
        this.company = [];
        this.jobs = [];
      },
      (error: any) => {
        console.error('Error fetching event details:', error);
      }
    );
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
}
