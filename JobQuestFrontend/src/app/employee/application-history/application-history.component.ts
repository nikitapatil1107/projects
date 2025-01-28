import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JobService } from '../../services/job.service';
import { UserProfileService } from '../../services/user-profile.service';
import { JobDetailInfoModel } from '../../models/job-detail-info-model';
import { Event } from '../../models/eventModel/event';

@Component({
  selector: 'app-application-history',
  templateUrl: './application-history.component.html',
  styleUrl: './application-history.component.css',
})
export class ApplicationHistoryComponent {
  appliedJobs: JobDetailInfoModel[] = [];
  appliedEvents: Event[] = [];
  userId: any = '';
  currentRoute: string = '';
  listData: string[] = [];

  constructor(
    private jobService: JobService,
    private route: ActivatedRoute,
    private userService: UserProfileService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.userId = this.userService.getLoggedInUserId();
      if (params['forJobs']) {
        this.jobService
          .fetchUserAppliedJobs(this.userId)
          .subscribe((response) => {
            this.appliedJobs = response;
            this.currentRoute = "jobs"
            this.appliedEvents = [];
          });
      } else {
        this.jobService
          .getAppliedEventsOfUser(this.userId)
          .subscribe((response) => {
            this.appliedEvents = response;
            this.currentRoute = "events"
            this.appliedJobs = [];
          });
      }
    });
  }

  onEventRouting = (eventId: number) => {
    this.router.navigate(['employee/eventData'], {queryParams: {eventId: eventId}})
  }
}
