import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployerRegisterPageComponent } from './employer-register-page/employer-register-page.component';
import { EmployerLoginPageComponent } from './employer-login-page/employer-login-page.component';
import { EmployerDashboardComponent } from './employer-dashboard/employer-dashboard.component';
import { CompanyFormComponent } from './company-form/company-form.component';
import { JobFormEmployerComponent } from './job-form-employer/job-form-employer.component';
import { ViewAppliedUsersComponent } from './view-applied-users/view-applied-users.component';
import { OverviewResumeEmployerComponent } from './overview-resume-employer/overview-resume-employer.component';
import { EmployerAuthGuard } from '../employer-auth.guard';

const routes: Routes = [
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
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmployerRoutingModule {}
