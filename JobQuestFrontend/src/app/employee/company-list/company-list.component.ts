import { Component } from '@angular/core';
import { CompanyDetailsService } from '../../services/employee/company-details.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrl: './company-list.component.css',
})
export class CompanyListComponent {
  companyList: any;
  companyTag: string = '';

  constructor(
    private companyService: CompanyDetailsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      if (Object.keys(params).length === 0) {
        // No query parameters exist, call API to get all jobs
        this.companyService.fetchAllCompanies().subscribe((response) => {
          this.companyList = response;
        });
      } else {
        // Query parameters exist, call API to get jobs by job name tag
        this.companyTag = params['companyTag'];
        this.companyService
          .fetchCompaniesWithTags(this.companyTag)
          .subscribe((response) => {
            this.companyList = response;
          });
      }
    });
  }
}
