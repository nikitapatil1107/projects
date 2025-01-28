import { Component } from '@angular/core';
import { UserProfile } from '../../models/userProfile/user-profile';
import { UserProfileService } from '../../services/user-profile.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-overview-resume-employer',
  templateUrl: './overview-resume-employer.component.html',
  styleUrl: './overview-resume-employer.component.css',
})
export class OverviewResumeEmployerComponent {
  queryParams: any;
  userId: number = 0;
  userProfileData: UserProfile = new UserProfile();

  constructor(
    private userProfileService: UserProfileService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.queryParams = params;
      // Query parameters exist, call API to get jobs by job name tag
      if (params['userId']) {
        this.userId = params['userId'];

        this.userProfileService
          .getUserProfileDataOfUser(this.userId)
          .subscribe((response) => {
            this.userProfileData = response;
          });
      }
    });
  }

  calculateMonths = (startDate: string, endDate: string): number => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const diffMonths = (end.getFullYear() - start.getFullYear()) * 12;
    const monthDiff = end.getMonth() - start.getMonth();

    return diffMonths + monthDiff;
  };
}
