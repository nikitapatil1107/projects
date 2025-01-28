import { Component } from '@angular/core';
import { JobService } from '../../services/job.service';
import { JobDetailInfoModel } from '../../models/job-detail-info-model';
import { AppliedJobInfoModel } from '../../models/appliedJobs/applied-job-info.model';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';

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
  selector: 'app-single-job',
  templateUrl: './single-job.component.html',
  styleUrl: './single-job.component.css',
})
export class SingleJobComponent {
  jobInfo: JobDetailInfoModel = new JobDetailInfoModel();
  jobId: string = '';
  userLoggedIn: boolean = false;
  alreadyApplied: boolean = false;
  companyId: any;
  userId: string = '';

  constructor(
    private jobsService: JobService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.jobId = params['jobId'];
    });

    // Checking user is logged in or not
    if (typeof sessionStorage !== 'undefined') {
      const userId = sessionStorage.getItem('user_id');
      if (userId) {
        this.userId = userId + '';
        this.userLoggedIn = true;

        // Check if user already applied
        this.jobsService
          .fetchUserAlreadyApplied(this.userId, this.jobId)
          .subscribe((response) => {
            this.alreadyApplied = response;
          });
      }

      this.jobsService.singleJobPage(this.jobId).subscribe((response) => {
        this.jobInfo = response;
        this.companyId = response.compId.compId;
      });
    }
  }

  viewCompanyDetails() {
    this.router.navigate(['/companyDetails'], {
      queryParams: { companyId: this.companyId },
    });
  }

  onShareJobPage = () => {
    const urlToShare = window.location.href;

    if (navigator.share) {
      navigator
        .share({
          title: 'Your job title',
          text: 'Check out this job!',
          url: urlToShare,
        })
        .then(() => console.log('Shared successfully'))
        .catch((error) => console.log('Error sharing', error));
    } else {
      // Fallback for browsers that do not support Web Share API
      const dummyTextArea = document.createElement('textarea');
      document.body.appendChild(dummyTextArea);
      dummyTextArea.value = urlToShare;
      dummyTextArea.select();
      document.execCommand('copy');
      document.body.removeChild(dummyTextArea);
    }
  };

  applyJob(jobId: number, compId: number, jobName: string) {
    const appliedJobInfo: AppliedJobInfoModel = {
      id: parseInt(this.userId),
      jobId: jobId,
      compId: compId,
      jobName: jobName,
      isJobRejected: false,
    };

    this.jobsService.applyJob(appliedJobInfo).subscribe((response) => {
      this.alreadyApplied = true;
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Job Applied Successfully',
        text: 'Explore more jobs on our platform, discover more job opportunities!',
        showConfirmButton: false,
        timer: 1500,
      });

      if (!this.jobsService.getFeedbackFilledValue()) {
        sessionStorage.setItem('isFeedbackFilled', 'true');
        this.router.navigate(['/employee/feedback']);
      }
    });
  }

  removeAppliedJob() {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You can apply to this job again in the future',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Withdraw',
    }).then((result) => {
      if (result.isConfirmed) {
        this.jobsService
          .removeUserAppliedJob(this.userId, this.jobId)
          .subscribe((response) => {
            if (response) {
              this.alreadyApplied = false;
              Swal.fire({
                title: 'Application Withdrawn!',
                text: 'Your application have been withdrawn successfully.',
                icon: 'success',
              });
            } else {
              this.alreadyApplied = true;
            }
          });
      }
    });
  }
}
