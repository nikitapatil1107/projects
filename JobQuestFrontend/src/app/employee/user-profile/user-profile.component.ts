import { Component } from '@angular/core';
import { UserProfileService } from '../../services/user-profile.service';
import { UserProfile } from '../../models/userProfile/user-profile';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserWorkExperience } from '../../models/userWorkExperienceModel/user-work-experience';
import { UserEducation } from '../../models/userEducationModel/user-education';
import { Router } from '@angular/router';
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
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css',
})
export class UserProfileComponent {
  isDisabled: boolean = false;
  workExpAddedClicked: boolean = false;
  userEducationAddedClicked: boolean = false;
  userId: number = 1;
  skillsOfFollowingRolesList: string[] = [];
  yourSelectedSkillsList: string[] = [];
  todayDate = new Date().toISOString().split('T')[0];

  userProfileData: UserProfile = new UserProfile();

  userWorkExpFormData = this.formBuilder.group({
    // Other form controls...
    companyName: ['', Validators.required],
    titleName: ['', Validators.required],
    startDate: ['', Validators.required],
    endDate: ['', Validators.required],
    workDescription: ['', Validators.required],
    user_id: [new UserProfile(), Validators.required],
  });
  userEducationFormData = this.formBuilder.group({
    // Other form controls...
    collegeName: ['', Validators.required],
    graduationYear: ['', Validators.required],
    degreeMajor: ['', Validators.required],
    gpaScore: ['', Validators.required],
  });

  userProfileFormData: FormGroup;
  constructor(
    private userService: UserProfileService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.userProfileFormData = this.formBuilder.group({
      userName: ['', Validators.required],
      userEmail: ['', Validators.required],
      userPassword: ['', Validators.required],
      userContactNo: ['', Validators.required],
      workStatus: ['', Validators.required],
      userLocation: ['', Validators.required],
      primaryRole: ['', Validators.required],
      yearsOfExpInPrimaryRole: ['', Validators.required],
      openToFollowingRoles: ['', Validators.required],
      userBio: ['', Validators.required],
      userGender: ['', Validators.required],
      websiteUrl: ['', Validators.required],
      linkedInUrl: ['', Validators.required],
      githubUrl: ['', Validators.required],
      twitterUrl: ['', Validators.required],
      userSkills: ['', Validators.required],
      userOTP: ['', Validators.required],
      workExpList: new FormGroup([]),
      userEducationList: new FormGroup([]),
    });
  }
  ngOnInit() {
    this.userId = this.userService.getLoggedInUserId();
    if (this.userId > 0) {
      this.userService
        .getUserProfileDataOfUser(this.userId)
        .subscribe((userProfile: UserProfile) => {
          this.userProfileData = userProfile;
          this.userProfileFormData.patchValue({
            userName: this.userProfileData.userName,
            userEmail: this.userProfileData.userEmail,
            userPassword: this.userProfileData.userPassword,
            userContactNo: this.userProfileData.userContactNo,
            workStatus: this.userProfileData.workStatus,
            userLocation: this.userProfileData.userLocation,
            primaryRole: this.userProfileData.primaryRole,
            yearsOfExpInPrimaryRole:
              this.userProfileData.yearsOfExpInPrimaryRole,
            openToFollowingRoles: this.userProfileData.openToFollowingRoles,
            userBio: this.userProfileData.userBio,
            userGender: this.userProfileData.userGender,
            websiteUrl: this.userProfileData.websiteUrl,
            linkedInUrl: this.userProfileData.linkedInUrl,
            githubUrl: this.userProfileData.githubUrl,
            twitterUrl: this.userProfileData.twitterUrl,
            userSkills: this.userProfileData.userSkills,
            userOTP: this.userProfileData.userOTP,
            workExpList: this.userProfileData.workExpList,
            userEducationList: this.userProfileData.userEducationList,
          });
          if (
            this.userProfileData.openToFollowingRoles !== null &&
            this.userProfileData.openToFollowingRoles.length !== 0
          ) {
            let li: string[] = [];
            li = this.userProfileData.openToFollowingRoles.split(',');
            this.skillsOfFollowingRolesList = [...li];
          }
          if (
            this.userProfileData.userSkills !== null &&
            this.userProfileData.userSkills.length !== 0
          ) {
            let liSkills: string[] = [];
            liSkills = this.userProfileData.userSkills.split(',');
            this.yourSelectedSkillsList = [...liSkills];
          }
        });
    }
  }

  onRoutingResume = () => {
    this.router.navigate([`employee/resume-profile`], { replaceUrl: true });
  };

  onRoutingOverview = () => {
    this.router.navigate([`employee/overview-profile`], { replaceUrl: true });
  };

  updateEndDateMinDate() {
    const startDate = this.userWorkExpFormData.get('startDate')!.value;
    this.userWorkExpFormData.get('endDate')!.patchValue(startDate);
  }

  addBasicInfoOfUser = () => {
    let openToSkillsStr: string = '';
    if (this.skillsOfFollowingRolesList.length !== 0) {
      openToSkillsStr = this.skillsOfFollowingRolesList.join(',');
    }
    let basicUserInfoData: UserProfile = new UserProfile();
    basicUserInfoData.userName = this.userProfileFormData.value.userName;
    basicUserInfoData.userContactNo =
      this.userProfileFormData.value.userContactNo;
    basicUserInfoData.userLocation =
      this.userProfileFormData.value.userLocation;
    basicUserInfoData.primaryRole = this.userProfileFormData.value.primaryRole;
    basicUserInfoData.yearsOfExpInPrimaryRole =
      this.userProfileFormData.value.yearsOfExpInPrimaryRole;
    basicUserInfoData.openToFollowingRoles = openToSkillsStr;
    basicUserInfoData.userBio = this.userProfileFormData.value.userBio;

    if (
      basicUserInfoData.userName.length === 0 ||
      basicUserInfoData.userContactNo === null ||
      basicUserInfoData.userLocation.length === 0 ||
      basicUserInfoData.primaryRole.length === 0 ||
      basicUserInfoData.yearsOfExpInPrimaryRole === 0
    ) {
      Toast.fire({
        icon: 'warning',
        title: 'Please Fill Required Fields First!',
      });
      return;
    }

    this.userService
      .saveBasicInfoUserData(this.userId, basicUserInfoData)
      .subscribe((response) => {
        Toast.fire({
          icon: 'success',
          title: 'Basic Info Saved !',
        });
      });
  };

  addSocialProfileOfUser = () => {
    let socialProfileOfUser: UserProfile = new UserProfile();
    socialProfileOfUser.websiteUrl = this.userProfileFormData.value.websiteUrl;
    socialProfileOfUser.githubUrl = this.userProfileFormData.value.githubUrl;
    socialProfileOfUser.twitterUrl = this.userProfileFormData.value.twitterUrl;
    socialProfileOfUser.linkedInUrl =
      this.userProfileFormData.value.linkedInUrl;

    this.userService
      .saveSocialInfoOfUser(this.userId, socialProfileOfUser)
      .subscribe((response) => {
        Toast.fire({
          icon: 'success',
          title: 'Social Profile Saved !',
        });
      });
  };

  addWorkExperience = () => {
    let userDTO = new UserProfile();
    userDTO.id = this.userProfileData.id;
    let userWorkExperience: UserWorkExperience = {
      workExpId: 0,
      companyName: this.userWorkExpFormData.value.companyName!,
      titleName: this.userWorkExpFormData.value.titleName!,
      startDate: this.userWorkExpFormData.value.startDate!,
      endDate: this.userWorkExpFormData.value.endDate!,
      workDescription: this.userWorkExpFormData.value.workDescription!,
      user_id: userDTO,
    };

    if (
      userWorkExperience.companyName.length === 0 ||
      userWorkExperience.titleName.length === 0 ||
      userWorkExperience.startDate.length === 0 ||
      userWorkExperience.endDate.length === 0 ||
      userWorkExperience.workDescription.length === 0
    ) {
      Toast.fire({
        icon: 'warning',
        title: 'Please Fill Required Fields First!',
      });
      return;
    }
    this.userService
      .saveWorkExperienceOfUser(userWorkExperience)
      .subscribe((response) => {
        this.workExpAddedClicked = false;
        this.userProfileData.workExpList.push(userWorkExperience);
        this.userWorkExpFormData.patchValue({
          // Other form controls...
          companyName: '',
          titleName: '',
          startDate: '',
          endDate: '',
          workDescription: '',
          user_id: new UserProfile(),
        });
        Toast.fire({
          icon: 'success',
          title: 'Work Experience Saved !',
        });
      });
  };

  addUserEducation = () => {
    let userDTO = new UserProfile();
    userDTO.id = this.userProfileData.id;
    let userEducation: UserEducation = {
      userEduId: 0,
      collegeName: this.userEducationFormData.value.collegeName!,
      gpaScore: parseInt(this.userEducationFormData.value.gpaScore!),
      degreeMajor: this.userEducationFormData.value.degreeMajor!,
      graduationYear: parseInt(
        this.userEducationFormData.value.graduationYear!
      ),
      user_id: userDTO,
    };

    if (
      userEducation.collegeName.length === 0 ||
      this.userEducationFormData.value.gpaScore?.length === 0 ||
      userEducation.degreeMajor.length === 0 ||
      this.userEducationFormData.value.graduationYear?.length === 0
    ) {
      Toast.fire({
        icon: 'warning',
        title: 'Please Fill Required Fields First!',
      });
      return;
    }
    this.userService
      .saveUserEducationData(userEducation)
      .subscribe((response) => {
        this.userProfileData.userEducationList.push(userEducation);
        this.userEducationAddedClicked = false;
        this.userEducationFormData.patchValue({
          // Other form controls...
          collegeName: '',
          graduationYear: '',
          degreeMajor: '',
          gpaScore: '',
        });
        Toast.fire({
          icon: 'success',
          title: 'Education Details Saved !',
        });
      });
  };

  saveYourSelectedSkillsData = () => {
    let yourSelectedSkillsStr: string = '';
    if (this.yourSelectedSkillsList.length !== 0) {
      yourSelectedSkillsStr = this.yourSelectedSkillsList.join(',');
    }
    let userProfileSkills = new UserProfile();
    userProfileSkills.userSkills = yourSelectedSkillsStr;
    this.userService
      .saveUserSelectedSkills(this.userId, userProfileSkills)
      .subscribe((response) => {
        Toast.fire({
          icon: 'success',
          title: 'Skills Saved !',
        });
      });
  };

  addSkillOfFollowingRoles = (event: any) => {
    const selectedSkill = event.target.value;
    if (
      selectedSkill &&
      !this.skillsOfFollowingRolesList.includes(selectedSkill)
    ) {
      this.skillsOfFollowingRolesList.push(selectedSkill);
      this.userProfileFormData
        .get('skillsOfFollowingRolesList')
        ?.setValue(this.skillsOfFollowingRolesList); // Update form control value
      // this.userProfileFormData.get('openToFollowingRoles')?.setValue(this.skillsOfFollowingRolesList); // Update form control value
      Toast.fire({
        icon: 'success',
        title: 'Skill Added !',
      });
    }
  };

  removeSkillOfFollowingRoles(skill: string) {
    this.skillsOfFollowingRolesList = this.skillsOfFollowingRolesList.filter(
      (s) => s !== skill
    );
    this.userProfileFormData
      .get('skillsOfFollowingRolesList')
      ?.setValue(this.skillsOfFollowingRolesList); // Update form control value
  }

  addYourSelectedSkills = (event: any) => {
    const selectedSkill = event.target.value;
    if (selectedSkill && !this.yourSelectedSkillsList.includes(selectedSkill)) {
      this.yourSelectedSkillsList.push(selectedSkill);
      this.userProfileFormData
        .get('yourSelectedSkillsList')
        ?.setValue(this.yourSelectedSkillsList); // Update form control value
      // this.userProfileFormData.get('openToFollowingRoles')?.setValue(this.skillsOfFollowingRolesList); // Update form control value
    }
  };

  removeYourSelectedSkills(skill: string) {
    this.yourSelectedSkillsList = this.yourSelectedSkillsList.filter(
      (s) => s !== skill
    );
    this.userProfileFormData
      .get('yourSelectedSkillsList')
      ?.setValue(this.yourSelectedSkillsList); // Update form control value

    Toast.fire({
      icon: 'warning',
      title: 'Skill Removed !',
    });
  }

  addMoreWorkExperienceBoolean = () => {
    this.workExpAddedClicked = true;
  };

  cancelButtonFunctionOfWorkExp = () => {
    if (this.workExpAddedClicked) {
      this.workExpAddedClicked = false;
    }
  };
  addMoreUserEducationBoolean = () => {
    this.userEducationAddedClicked = true;
  };

  cancelUserEducationButtonFunction = () => {
    if (this.userEducationAddedClicked) {
      this.userEducationAddedClicked = false;
    }
  };

  deleteWorkExperience = (userWorkExpId: number) => {
    this.userService
      .deleteWorkExpOfUSer(userWorkExpId)
      .subscribe((response) => {
        Toast.fire({
          icon: 'success',
          title: 'Work Experience Deleted!',
        });
        this.userProfileData.workExpList =
          this.userProfileData.workExpList.filter((userWork) => {
            return userWork.workExpId !== userWorkExpId;
          });
      });
  };

  deleteUserEducation = (userEduId: number) => {
    this.userService.deleteUserEducation(userEduId).subscribe((response) => {
      Toast.fire({
        icon: 'success',
        title: 'User Education Deleted!',
      });
      this.userProfileData.userEducationList =
        this.userProfileData.userEducationList.filter((userEdu) => {
          return userEdu.userEduId !== userEduId;
        });
    });
  };
}
