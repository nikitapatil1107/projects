import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterPageComponent } from './register-page/register-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { ListOfJobsComponent } from './list-of-jobs/list-of-jobs.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { EventDetailPageComponent } from './event-detail-page/event-detail-page.component';
import { OverviewProfileComponent } from './overview-profile/overview-profile.component';
import { ResumeProfileComponent } from './resume-profile/resume-profile.component';
import { CompanyDetailsComponent } from './company-details/company-details.component';
import { CompanyListComponent } from './company-list/company-list.component';
import { SingleJobComponent } from './single-job/single-job.component';
import { ApplicationHistoryComponent } from './application-history/application-history.component';
import { AuthGuard } from '../auth.guard';
import { JobSearchComponent } from './job-search/job-search.component';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';
import { AppFeedbackComponent } from './app-feedback/app-feedback.component';
import { SavedJobsComponent } from './saved-jobs/saved-jobs.component';
import { ChangePasswordComponent } from './change-password/change-password.component';

const routes: Routes = [
  {
    path: 'employee',
    children: [
      {
        path: 'register',
        component: RegisterPageComponent,
      },
      {
        path: 'login',
        component: LoginPageComponent,
      },
      {
        path: 'resetPassword',
        component: ResetPasswordComponent,
      },
      {
        path: 'verifyEmail',
        component: VerifyEmailComponent,
      },
      {
        path: 'listOfJobs',
        component: ListOfJobsComponent,
      },
      {
        path: 'feedback',
        component: AppFeedbackComponent,
      },
      {
        path: 'userProfile',
        component: UserProfileComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'companyList',
        component: ListOfJobsComponent,
      },
      {
        path: 'jobSearch',
        component: JobSearchComponent,
      },
      {
        path: 'eventData',
        component: EventDetailPageComponent,
      },
      {
        path: 'overview-profile',
        component: OverviewProfileComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'resume-profile',
        component: ResumeProfileComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'savedJobs',
        component: SavedJobsComponent,
      },
      {
        path: 'changePassword',
        component: ChangePasswordComponent,
      },
    ],
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
    path: '**',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmployeeRoutingModule {}
