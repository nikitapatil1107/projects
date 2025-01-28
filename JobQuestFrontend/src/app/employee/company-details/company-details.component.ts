import { Component } from '@angular/core';
import { Company } from '../../models/companyModel/company';
import { CompanyDetailsService } from '../../services/employee/company-details.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrl: './company-details.component.css',
})
export class CompanyDetailsComponent {
  companyDetails: Company = new Company();
  companyId: any = '';

  constructor(
    private companyService: CompanyDetailsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.companyId = this.route.snapshot.paramMap.get('companyId');

    this.route.queryParams.subscribe((params) => {
      this.companyId = params['companyId'];
    });

    this.companyService
      .fetchCompanyDetails(this.companyId)
      .subscribe((response) => {
        this.companyDetails = response;
      });
  }
}
