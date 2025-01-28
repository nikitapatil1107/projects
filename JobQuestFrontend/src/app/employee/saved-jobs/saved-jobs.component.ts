import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JobService } from '../../services/job.service';
import { UserProfileService } from '../../services/user-profile.service';
import { JobDetailInfoModel } from '../../models/job-detail-info-model';

@Component({
  selector: 'app-saved-jobs',
  templateUrl: './saved-jobs.component.html',
  styleUrl: './saved-jobs.component.css',
})
export class SavedJobsComponent {
  savedJobs: JobDetailInfoModel[] = [];
  userId: any = '';

  constructor(
    private jobService: JobService,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserProfileService
  ) {}

  ngOnInit() {
    this.userId = this.userService.getLoggedInUserId();
    this.jobService.getSavedJobs(this.userId).subscribe((response) => {
      this.savedJobs = response;
    });
  }
}
