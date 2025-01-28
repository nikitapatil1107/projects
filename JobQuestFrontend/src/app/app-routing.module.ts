import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './employee/home-page/home-page.component';
import { CompanyDetailsComponent } from './employee/company-details/company-details.component';
import { CompanyListComponent } from './employee/company-list/company-list.component';
import { SingleJobComponent } from './employee/single-job/single-job.component';
import { ApplicationHistoryComponent } from './employee/application-history/application-history.component';
import { AuthGuard } from './auth.guard';
import { EmployerRegisterPageComponent } from './employer/employer-register-page/employer-register-page.component';
import { EmployerLoginPageComponent } from './employer/employer-login-page/employer-login-page.component';
import { EmployerDashboardComponent } from './employer/employer-dashboard/employer-dashboard.component';
import { EmployerAuthGuard } from './employer-auth.guard';
import { CompanyFormComponent } from './employer/company-form/company-form.component';
import { JobFormEmployerComponent } from './employer/job-form-employer/job-form-employer.component';
import { ViewAppliedUsersComponent } from './employer/view-applied-users/view-applied-users.component';
import { OverviewResumeEmployerComponent } from './employer/overview-resume-employer/overview-resume-employer.component';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
  },
  {
    path: 'companyDetails',
    component: CompanyDetailsComponent,
  },
  {
    path: 'companyList',
    component: CompanyListComponent,
  },
  {
    path: 'singleJob',
    component: SingleJobComponent,
  },
  {
    path: 'appliedJobs',
    component: ApplicationHistoryComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'employer',
    children: [
      {
        path: 'companyRegister',
        component: EmployerRegisterPageComponent,
      },
      {
        path: 'companyLogin',
        component: EmployerLoginPageComponent,
      },
      {
        path: 'employerDashboard',
        component: EmployerDashboardComponent,
        canActivate: [EmployerAuthGuard],
      },
      {
        path: 'companyForm',
        component: CompanyFormComponent,
        canActivate: [EmployerAuthGuard],
      },
      {
        path: 'jobForm',
        component: JobFormEmployerComponent,
        canActivate: [EmployerAuthGuard],
      },
      {
        path: 'viewApplication',
        component: ViewAppliedUsersComponent,
        canActivate: [EmployerAuthGuard],
      },
      {
        path: 'overview-user',
        component: OverviewResumeEmployerComponent,
        canActivate: [EmployerAuthGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
