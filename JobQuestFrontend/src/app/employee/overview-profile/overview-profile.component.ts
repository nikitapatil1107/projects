import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserProfileService } from '../../services/user-profile.service';
import { UserProfile } from '../../models/userProfile/user-profile';

@Component({
  selector: 'app-overview-profile',
  templateUrl: './overview-profile.component.html',
  styleUrl: './overview-profile.component.css',
})
export class OverviewProfileComponent {
  queryParams: any;
  userId: number = 0;
  userProfileData: UserProfile = new UserProfile();

  constructor(
    private router: Router,
    private userProfileService: UserProfileService
  ) {}

  ngOnInit() {
    this.userId = this.userProfileService.getLoggedInUserId();
    this.userProfileService
      .getUserProfileDataOfUser(this.userId)
      .subscribe((response) => {
        this.userProfileData = response;
      });
  }

  onRoutingProfile = () => {
    this.router.navigate([`employee/userProfile`], {
      replaceUrl: true,
    });
  };

  onRoutingResume = () => {
    this.router.navigate([`employee/resume-profile`], {
      replaceUrl: true,
    });
  };

  calculateMonths = (startDate: string, endDate: string): number => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const diffMonths = (end.getFullYear() - start.getFullYear()) * 12;
    const monthDiff = end.getMonth() - start.getMonth();

    return diffMonths + monthDiff;
  };
}
