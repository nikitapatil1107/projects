import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../../services/event.service';
import { Event } from '../../models/eventModel/event';
import { UserProfileService } from '../../services/user-profile.service';
import Swal from 'sweetalert2';

const Toast = Swal.mixin({
  toast: true,
  position: 'top',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  },
});

@Component({
  selector: 'app-event-detail-page',
  templateUrl: './event-detail-page.component.html',
  styleUrl: './event-detail-page.component.css',
})
export class EventDetailPageComponent {
  queryParams: any;
  eventId: number = 0;
  eventInfo?: Event;
  userLoggedInId: number = 0;
  isUserLoggedIn: boolean = false;
  alreadyApplied: boolean = false;
  isLoading: boolean = true;
  @ViewChild('scrollspyHeading1') scrollspyHeading1?: ElementRef;
  @ViewChild('scrollspyHeading2') scrollspyHeading2?: ElementRef;
  @ViewChild('scrollspyHeading3') scrollspyHeading3?: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private eventService: EventService,
    private userService: UserProfileService,
    private elementRef: ElementRef,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.queryParams = params;
      this.eventId = params['eventId'];

      this.eventService
        .getEventDetailById(this.eventId)
        .subscribe((response) => {
          this.userLoggedInId = this.getUserLoggedInStatusData();
          if (this.userLoggedInId != -1) {
            this.isUserLoggedIn = true;
            this.eventService
              .getIfEventAlreadyApplied(this.eventId, this.userLoggedInId)
              .subscribe((response) => {
                this.alreadyApplied = response;
                this.isLoading = false;
              });
          }
          this.eventInfo = response;
        });
    });
  }

  goToRegisterPage = () => {
    this.router.navigate(['/employee/register']);
  };

  applyToEvent = () => {
    this.eventService
      .applyToEvent(this.eventId, this.userLoggedInId)
      .subscribe((response) => {
        this.alreadyApplied = true;
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Event Applied Successfully',
          text: 'Explore more events on our platform, discover more job opportunities!',
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };

  removeAppliedEvent = () => {
    Swal.fire({
      title: 'Withdraw Event Application?',
      text: 'You can apply to this event again in the future',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Withdraw',
    }).then((result) => {
      if (result.isConfirmed) {
        this.eventService
          .removeAppliedEvent(this.eventId, this.userLoggedInId)
          .subscribe((response) => {
            this.alreadyApplied = false;
            Swal.fire({
              title: 'Application Withdrawn!',
              text: 'Your application have been withdrawn successfully.',
              icon: 'success',
            });
          });
      }
    });
  };

  scrollTo(elementId: string): void {
    const element = this.elementRef.nativeElement.querySelector(
      `#${elementId}`
    );
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest',
      });
    }
  }

  getUserLoggedInStatusData = (): number => {
    return this.userService.getLoggedInUserId();
  };
}
