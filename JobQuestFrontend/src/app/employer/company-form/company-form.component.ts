import { Component } from '@angular/core';
import { Company } from '../../models/companyModel/company';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployerCompanyService } from '../../services/employer-company.service';
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
  selector: 'app-company-form',
  templateUrl: './company-form.component.html',
  styleUrl: './company-form.component.css',
})
export class CompanyFormComponent {
  isDisabled: boolean = false;
  companyDetailData: Company = new Company();
  queryParams: any;
  compId: number = 0;
  selectedBannerFile?: File;
  selectedPosterFile?: File;
  isBannerFileSelected: boolean = false;
  isPosterFileSelected: boolean = false;
  bannerNameSelected: string = '';
  posterNameSelected: string = '';

  companyProfileFormData: FormGroup;
  constructor(
    private companyService: EmployerCompanyService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.companyProfileFormData = this.formBuilder.group({
      compName: ['', Validators.required],
      compDesc: ['', Validators.required],
      tag1: ['', Validators.required],
      tag2: ['', Validators.required],
      tag3: ['', Validators.required],
      tag4: ['', Validators.required],
      compVideoUrl: ['', Validators.required],
      compTagLine: ['', Validators.required],
      compWebsiteUrl: ['', Validators.required],
      foundedAt: ['', Validators.required],
      compType: ['', Validators.required],
      compHeadquaters: ['', Validators.required],
      compRating: ['', Validators.required],
      noOfFollower: ['', Validators.required],
      compBannerImg: ['', Validators.required],
      compPosterImg: ['', Validators.required],
      compEmail: ['', Validators.required],
      compPassword: ['', Validators.required],
      compContactName: ['', Validators.required],
      compContactNo: ['', Validators.required],
      isCompanyActive: ['', Validators.required],
      jobs: new FormGroup([]),
    });
  }
  ngOnInit() {
    this.compId = this.companyService.getCompanyId();
    if (this.compId > 0) {
      this.companyService
        .getCompanyProfileData(this.compId)
        .subscribe((companyProfile: Company) => {
          this.companyDetailData = companyProfile;
          this.companyProfileFormData.patchValue({
            compName: this.companyDetailData.compName,
            compDesc: this.companyDetailData.compDesc,
            tag1: this.companyDetailData.tag1,
            tag2: this.companyDetailData.tag2,
            tag3: this.companyDetailData.tag3,
            tag4: this.companyDetailData.tag4,
            compVideoUrl: this.companyDetailData.compVideoUrl,
            compTagLine: this.companyDetailData.compTagLine,
            compWebsiteUrl: this.companyDetailData.compWebsiteUrl,
            foundedAt: this.companyDetailData.foundedAt,
            compType: this.companyDetailData.compType,
            compHeadquaters: this.companyDetailData.compHeadquaters,
            compRating: this.companyDetailData.compRating,
            noOfFollower: this.companyDetailData.noOfFollower,
            compBannerImg: this.companyDetailData.compBannerImg,
            compPosterImg: this.companyDetailData.compPosterImg,
            compEmail: this.companyDetailData.compEmail,
            compPassword: this.companyDetailData.compPassword,
            compContactName: this.companyDetailData.compContactName,
            compContactNo: this.companyDetailData.compContactNo,
            isCompanyActive: this.companyDetailData.isCompanyActive,
            jobs: this.companyDetailData.jobs,
          });
          this.bannerNameSelected = this.companyDetailData.compBannerImg ?? '';
          this.posterNameSelected = this.companyDetailData.compPosterImg ?? '';
        });
    }
  }

  addBasicInfoOfCompany = () => {
    let basicCompanyInfoData: Company = new Company();
    basicCompanyInfoData.compName = this.companyProfileFormData.value.compName;
    basicCompanyInfoData.compContactNo =
      this.companyProfileFormData.value.compContactNo;
    basicCompanyInfoData.compContactName =
      this.companyProfileFormData.value.compContactName;
    basicCompanyInfoData.compDesc = this.companyProfileFormData.value.compDesc;

    if (
      basicCompanyInfoData.compName.length === 0 ||
      basicCompanyInfoData.compContactNo === null ||
      basicCompanyInfoData.compContactName?.length === 0 ||
      basicCompanyInfoData.compDesc.length === 0
    ) {
      Toast.fire({
        icon: 'warning',
        title: 'Please Fill Required Fields!',
      });
      return;
    }
    this.companyService
      .saveBasicInfoCompany(this.compId, basicCompanyInfoData)
      .subscribe((response) => {
        Toast.fire({
          icon: 'success',
          title: 'Basic Info Saved !',
        });
      });
  };

  addMoreCompanyInfo = () => {
    let moreInfoCompany: Company = new Company();
    moreInfoCompany.compWebsiteUrl =
      this.companyProfileFormData.value.compWebsiteUrl;
    moreInfoCompany.compHeadquaters =
      this.companyProfileFormData.value.compHeadquaters;
    moreInfoCompany.foundedAt = this.companyProfileFormData.value.foundedAt;
    moreInfoCompany.compType = this.companyProfileFormData.value.compType;
    moreInfoCompany.compTagLine = this.companyProfileFormData.value.compTagLine;

    if (
      moreInfoCompany.compWebsiteUrl.length === 0 ||
      moreInfoCompany.compHeadquaters.length === 0 ||
      moreInfoCompany.foundedAt.length === 0 ||
      moreInfoCompany.compType.length === 0 ||
      moreInfoCompany.compTagLine.length === 0
    ) {
      Toast.fire({
        icon: 'warning',
        title: 'Please Fill Required Fields!',
      });
      return;
    }
    this.companyService
      .saveMoreInfoCompany(this.compId, moreInfoCompany)
      .subscribe((response) => {
        Toast.fire({
          icon: 'success',
          title: 'Company Info Saved !',
        });
      });
  };
  addImageTagsCompanyInfo = () => {
    let imageTagsInfoCompany: Company = new Company();
    imageTagsInfoCompany.compBannerImg = this.bannerNameSelected;
    imageTagsInfoCompany.compPosterImg = this.posterNameSelected;
    imageTagsInfoCompany.tag1 = this.companyProfileFormData.value.tag1;
    imageTagsInfoCompany.tag2 = this.companyProfileFormData.value.tag2;
    imageTagsInfoCompany.tag3 = this.companyProfileFormData.value.tag3;
    imageTagsInfoCompany.tag4 = this.companyProfileFormData.value.tag4;

    if (
      imageTagsInfoCompany.tag1.length === 0 ||
      imageTagsInfoCompany.tag2.length === 0 ||
      imageTagsInfoCompany.tag3.length === 0 ||
      imageTagsInfoCompany.tag4.length === 0
    ) {
      Toast.fire({
        icon: 'warning',
        title: 'Please Fill Required Fields!',
      });
      return;
    }

    this.companyService
      .saveImageTagsCompanyInfo(this.compId, imageTagsInfoCompany)
      .subscribe((response) => {
        Toast.fire({
          icon: 'success',
          title: 'Image Tags Saved !',
        });
      });
  };

  onBannerImageSelected = (event: any) => {
    this.selectedBannerFile = event.target.files[0];
    if (this.selectedBannerFile != null) {
      this.isBannerFileSelected = true;
      this.bannerNameSelected = this.selectedBannerFile.name;
    }
  };
  onPosterImageSelected = (event: any) => {
    this.selectedPosterFile = event.target.files[0];
    if (this.selectedPosterFile != null) {
      this.posterNameSelected = this.selectedPosterFile.name;
      this.isPosterFileSelected = true;
    }
  };

  onGoBackToHomeClicked = () => {
    this.router.navigate(['/employer/employerDashboard']);
  };

  clearBannerFile() {
    this.selectedBannerFile = undefined;
    this.isBannerFileSelected = false;
    this.bannerNameSelected = '';
  }
  clearPosterFile() {
    this.selectedPosterFile = undefined;
    this.isPosterFileSelected = false;
    this.posterNameSelected = '';
  }
}
