import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployerRoutingModule } from './employer-routing.module';
import { CompanyFormComponent } from './company-form/company-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JobFormEmployerComponent } from './job-form-employer/job-form-employer.component';
import { EmployerRegisterPageComponent } from './employer-register-page/employer-register-page.component';
import { EmployerLoginPageComponent } from './employer-login-page/employer-login-page.component';
import { EmployerDashboardComponent } from './employer-dashboard/employer-dashboard.component';
import { ViewAppliedUsersComponent } from './view-applied-users/view-applied-users.component';
import { EmployerHeaderComponent } from './employer-header/employer-header.component';
import { OverviewResumeEmployerComponent } from './overview-resume-employer/overview-resume-employer.component';

@NgModule({
  declarations: [
    CompanyFormComponent,
    JobFormEmployerComponent,
    EmployerRegisterPageComponent,
    EmployerLoginPageComponent,
    EmployerDashboardComponent,
    ViewAppliedUsersComponent,
    EmployerHeaderComponent,
    OverviewResumeEmployerComponent
  ],
  imports: [
    CommonModule,
    EmployerRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    CompanyFormComponent,
    JobFormEmployerComponent,
    EmployerRegisterPageComponent,
    EmployerLoginPageComponent,
    ViewAppliedUsersComponent,
    EmployerHeaderComponent
  ],
})
export class EmployerModule {}
