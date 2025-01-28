import { Component } from '@angular/core';
import { JobDetailInfoModel } from '../../models/job-detail-info-model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployerJobService } from '../../services/employer-job.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployerCompanyService } from '../../services/employer-company.service';
import { Company } from '../../models/companyModel/company';
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
  selector: 'app-job-form-employer',
  templateUrl: './job-form-employer.component.html',
  styleUrl: './job-form-employer.component.css',
})
export class JobFormEmployerComponent {
  isDisabled: boolean = false;
  jobDetailData: JobDetailInfoModel = new JobDetailInfoModel();
  queryParams: any;
  jobId: number = 0;
  companyId: number = 0;
  companyProfileData: Company = new Company();

  jobProfileFormData: FormGroup;

  constructor(
    private jobService: EmployerJobService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private companyService: EmployerCompanyService
  ) {
    this.jobProfileFormData = this.formBuilder.group({
      jobName: ['', Validators.required],
      expReq: ['', Validators.required],
      location: ['', Validators.required],
      jobDesc: ['', Validators.required],
      role: ['', Validators.required],
      industryType: ['', Validators.required],
      department: ['', Validators.required],
      empType: ['', Validators.required],
      roleCategory: ['', Validators.required],
      education: ['', Validators.required],
      keySkills: ['', Validators.required],
      salRangeMin: ['', Validators.required],
      salRangeMax: ['', Validators.required],
      workMode: ['', Validators.required],
      compType: ['', Validators.required],
      // compId: new FormGroup({}),
    });
  }
  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.queryParams = params;
      this.companyId = this.companyService.getCompanyId();
      this.companyService
        .getCompanyProfileData(this.companyId)
        .subscribe((response) => {
          this.companyProfileData = response;
          if (Object.keys(params).length === 0) {
            // No query parameters exist, call API to get all jobs
          } else {
            // Query parameters exist, call API to get jobs by job name tag
            this.jobId = params['jobId'];
            if (this.jobId > 0) {
              this.jobService
                .getJobProfileData(this.jobId)
                .subscribe((jobProfile: JobDetailInfoModel) => {
                  this.jobDetailData = jobProfile;
                  this.jobProfileFormData.patchValue({
                    jobName: this.jobDetailData.jobName,
                    expReq: this.jobDetailData.expReq,
                    location: this.jobDetailData.location,
                    jobDesc: this.jobDetailData.jobDesc,
                    role: this.jobDetailData.role,
                    industryType: this.jobDetailData.industryType,
                    department: this.jobDetailData.department,
                    empType: this.jobDetailData.empType,
                    roleCategory: this.jobDetailData.roleCategory,
                    education: this.jobDetailData.education,
                    keySkills: this.jobDetailData.keySkills,
                    salRangeMin: this.jobDetailData.salRangeMin,
                    salRangeMax: this.jobDetailData.salRangeMax,
                    workMode: this.jobDetailData.workMode,
                    compType: this.jobDetailData.compType,
                    // compId: new FormGroup({}),
                  });
                });
            }
          }
        });
    });
  }
  // }
  //   });
  // }

  addBasicInfoOfJob = () => {
    let basicJobInfoData: JobDetailInfoModel = new JobDetailInfoModel();
    basicJobInfoData.jobName = this.jobProfileFormData.value.jobName;
    basicJobInfoData.location = this.jobProfileFormData.value.location;
    basicJobInfoData.expReq = this.jobProfileFormData.value.expReq;
    basicJobInfoData.keySkills = this.jobProfileFormData.value.keySkills;
    basicJobInfoData.jobDesc = this.jobProfileFormData.value.jobDesc;
    basicJobInfoData.role = this.jobProfileFormData.value.role;
    basicJobInfoData.industryType = this.jobProfileFormData.value.industryType;
    basicJobInfoData.department = this.jobProfileFormData.value.department;
    basicJobInfoData.empType = this.jobProfileFormData.value.empType;
    basicJobInfoData.roleCategory = this.jobProfileFormData.value.roleCategory;
    basicJobInfoData.education = this.jobProfileFormData.value.education;
    basicJobInfoData.salRangeMin = this.jobProfileFormData.value.salRangeMin;
    basicJobInfoData.salRangeMax = this.jobProfileFormData.value.salRangeMax;
    basicJobInfoData.workMode = this.jobProfileFormData.value.workMode;
    basicJobInfoData.compType = this.jobProfileFormData.value.compType;
    basicJobInfoData.postedAgo = 'Few Hours Ago';
    basicJobInfoData.noOfApplicant = 12;
    basicJobInfoData.compId = this.companyProfileData;
    basicJobInfoData.jobActive = true;

    if (
      basicJobInfoData.jobName.length === 0 ||
      basicJobInfoData.location.length === 0 ||
      basicJobInfoData.expReq.length === 0 ||
      basicJobInfoData.keySkills.length === 0 ||
      basicJobInfoData.jobDesc.length === 0 ||
      basicJobInfoData.role.length === 0 ||
      basicJobInfoData.industryType.length === 0 ||
      basicJobInfoData.department.length === 0 ||
      basicJobInfoData.empType.length === 0 ||
      basicJobInfoData.roleCategory.length === 0 ||
      basicJobInfoData.education.length === 0
    ) {
      Toast.fire({
        icon: 'warning',
        title: 'Please Fill Required Fields!',
      });
      return;
    }

    if (this.jobId === 0) {
      this.jobService
        .saveJobInfoCompany(basicJobInfoData)
        .subscribe((response) => {
          // NAVIGATE TO HOME PAGE DIRECTLY
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Job Details Saved !',
            showConfirmButton: false,
            timer: 1500,
          });
          this.router.navigate(['/employer/employerDashboard']);
        });
    } else {
      this.jobService
        .editJobInfoCompany(this.jobId, basicJobInfoData)
        .subscribe((response) => {
          // NAVIGATE TO HOME PAGE DIRECTLY
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Job Details Saved !',
            showConfirmButton: false,
            timer: 1500,
          });
          this.router.navigate(['/employer/employerDashboard']);
        });
    }
  };
}
