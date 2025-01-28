import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { RegisterPageComponent } from './register-page/register-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomePageComponent } from './home-page/home-page.component';
import { JobSearchComponent } from './job-search/job-search.component';
import { AppFeedbackComponent } from './app-feedback/app-feedback.component';
import { ListOfJobsComponent } from './list-of-jobs/list-of-jobs.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { CompanyDetailsComponent } from './company-details/company-details.component';
import { CompanyListComponent } from './company-list/company-list.component';
import { SingleJobComponent } from './single-job/single-job.component';
import { ApplicationHistoryComponent } from './application-history/application-history.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { EventDetailPageComponent } from './event-detail-page/event-detail-page.component';
import { OverviewProfileComponent } from './overview-profile/overview-profile.component';
import { ResumeProfileComponent } from './resume-profile/resume-profile.component';
import { SavedJobsComponent } from './saved-jobs/saved-jobs.component';
import { ChangePasswordComponent } from './change-password/change-password.component';

@NgModule({
  declarations: [RegisterPageComponent, LoginPageComponent, HomePageComponent, JobSearchComponent,ListOfJobsComponent,
    AppFeedbackComponent,
    ResetPasswordComponent,
    VerifyEmailComponent,
    CompanyDetailsComponent,
    CompanyListComponent,
    SingleJobComponent,
    ApplicationHistoryComponent, UserProfileComponent,
    EventDetailPageComponent,
    OverviewProfileComponent,
    ResumeProfileComponent,
    SavedJobsComponent,
    ChangePasswordComponent,],
  imports: [CommonModule, EmployeeRoutingModule, ReactiveFormsModule, FormsModule],
  exports: [RegisterPageComponent, LoginPageComponent, HomePageComponent, JobSearchComponent,
    AppFeedbackComponent, UserProfileComponent, ChangePasswordComponent],
})
export class EmployeeModule { }
