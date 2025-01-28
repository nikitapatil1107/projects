import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  selector: 'app-resume-profile',
  templateUrl: './resume-profile.component.html',
  styleUrl: './resume-profile.component.css',
})
export class ResumeProfileComponent {
  queryParams: any;
  userId: number = 0;
  selectedFile?: File;
  nameOfSelectedFileName: string = '';
  isFileSelected: boolean = false;
  isFileLoading: boolean = false;
  errorInFetching: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserProfileService
  ) {}

  ngOnInit() {
    this.userId = this.userService.getLoggedInUserId();
    this.userService.getNameOfPdf(this.userId).subscribe((response) => {
      this.nameOfSelectedFileName = response;
    });
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile != null) {
      this.isFileSelected = true;
      this.nameOfSelectedFileName = this.selectedFile.name;
    }
  }

  onUpload(): void {
    this.isFileLoading = true;

    const formData = new FormData();
    formData.append('file', this.selectedFile!, this.selectedFile?.name);
    this.userService
      .uploadPdfToDatabase(formData, this.userId)
      .subscribe((response) => {
        // this.isFileSelected = false;
        this.isFileLoading = false;
        // this.selectedFile = undefined;
        Toast.fire({
          icon: 'success',
          title: 'Resume Uploaded!',
        });
      });
  }

  viewResume = () => {
    this.userService.getResume(this.userId).subscribe(
      (data: ArrayBuffer) => {
        const blob = new Blob([data], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        window.open(url);
      },
      (error: any) => {
        console.error('Failed to fetch PDF:', error);
        this.errorInFetching = true;
        // Handle error
      }
    );
  };

  clearFile() {
    this.selectedFile = undefined;
    this.isFileSelected = false;
    this.nameOfSelectedFileName = '';
  }

  onRoutingProfile = () => {
    this.router.navigate([`employee/userProfile`], {
      replaceUrl: true,
    });
  };

  onRoutingOverview = () => {
    this.router.navigate([`employee/overview-profile`], {
      replaceUrl: true,
    });
  };
}
