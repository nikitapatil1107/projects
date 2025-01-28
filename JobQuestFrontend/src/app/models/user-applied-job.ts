import { UserEducation } from "./userEducationModel/user-education";
import { UserWorkExperience } from "./userWorkExperienceModel/user-work-experience";

export class UserAppliedJob {
    id?: number;
  userName: string;
  userEmail: string;
  userPassword: string;
  userContactNo: string;
  workStatus: boolean;
  userLocation: string;
  primaryRole: string;
  yearsOfExpInPrimaryRole: number;
  openToFollowingRoles: string;
  userBio: string;
  userGender: string;
  websiteUrl: string;
  linkedInUrl: string;
  githubUrl: string;
  twitterUrl: string;
  userSkills: string;
  userOTP: string;
  jobName: string;
  jobId: number;
  jobDataActive: boolean;
  workExpList: UserWorkExperience[];
  userEducationList: UserEducation[];

  constructor(
    userName?: string,
    userEmail?: string,
    userPassword?: string,
    userContactNo?: string,
    workStatus?: boolean,
    userLocation?: string,
    primaryRole?: string,
    yearsOfExpInPrimaryRole?: number,
    openToFollowingRoles?: string,
    userBio?: string,
    userGender?: string,
    websiteUrl?: string,
    linkedInUrl?: string,
    githubUrl?: string,
    twitterUrl?: string,
    userSkills?: string,
    userOTP?: string,
    jobName?: string,
    jobId?: number,
    jobDataActive?: boolean,
    workExpList?: UserWorkExperience[],
    userEducationList?: UserEducation[]
  ) {
    this.userName = userName ?? '';
    this.userEmail = userEmail ?? '';
    this.userPassword = userPassword ?? '';
    this.userContactNo = userContactNo ?? '';
    this.workStatus = workStatus ?? false;
    this.userLocation = userLocation ?? '';
    this.primaryRole = primaryRole ?? '';
    this.yearsOfExpInPrimaryRole = yearsOfExpInPrimaryRole ?? 0;
    this.openToFollowingRoles = openToFollowingRoles ?? '';
    this.userBio = userBio ?? '';
    this.userGender = userGender ?? '';
    this.websiteUrl = websiteUrl ?? '';
    this.linkedInUrl = linkedInUrl ?? '';
    this.githubUrl = githubUrl ?? '';
    this.twitterUrl = twitterUrl ?? '';
    this.userSkills = userSkills ?? '';
    this.userOTP = userOTP ?? '';
    this.jobName = jobName ?? '';
    this.jobId = jobId ?? 0;
    this.jobDataActive = jobDataActive ?? false;
    this.workExpList = workExpList ?? [];
    this.userEducationList = userEducationList ?? [];
  }
}
