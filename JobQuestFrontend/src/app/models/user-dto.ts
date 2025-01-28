export class UserDTO {
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
    userOTP?: string
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
  }

  get getUserName(): string {
    return this.userName;
  }

  set setUserName(userName: string) {
    this.userName = userName;
  }

  get getUserEmail(): string {
    return this.userEmail;
  }

  set setUserEmail(userEmail: string) {
    this.userEmail = userEmail;
  }

  get getUserPassword(): string {
    return this.userPassword;
  }

  set setUserPassword(userPassword: string) {
    this.userPassword = userPassword;
  }

  get getUserContactNo(): string {
    return this.userContactNo;
  }

  set setUserContactNo(userContactNo: string) {
    this.userContactNo = userContactNo;
  }

  get isWorkStatus(): boolean {
    return this.workStatus;
  }

  set setWorkStatus(workStatus: boolean) {
    this.workStatus = workStatus;
  }

  get getUserLocation(): string {
    return this.userLocation;
  }

  set setUserLocation(userLocation: string) {
    this.userLocation = userLocation;
  }

  get getPrimaryRole(): string {
    return this.primaryRole;
  }

  set setPrimaryRole(primaryRole: string) {
    this.primaryRole = primaryRole;
  }

  get getYearsOfExpInPrimaryRole(): number {
    return this.yearsOfExpInPrimaryRole;
  }

  set setYearsOfExpInPrimaryRole(yearsOfExpInPrimaryRole: number) {
    this.yearsOfExpInPrimaryRole = yearsOfExpInPrimaryRole;
  }

  get getOpenToFollowingRoles(): string {
    return this.openToFollowingRoles;
  }

  set setOpenToFollowingRoles(openToFollowingRoles: string) {
    this.openToFollowingRoles = openToFollowingRoles;
  }

  get getUserBio(): string {
    return this.userBio;
  }

  set setUserBio(userBio: string) {
    this.userBio = userBio;
  }

  get getUserGender(): string {
    return this.userGender;
  }

  set setUserGender(userGender: string) {
    this.userGender = userGender;
  }

  get getWebsiteUrl() {
    return this.websiteUrl;
  }

  set setWebsiteUrl(websiteUrl: string) {
    this.websiteUrl = websiteUrl;
  }

  get getLinkedInUrl(): string {
    return this.linkedInUrl;
  }

  set setLinkedInUrl(linkedInUrl: string) {
    this.linkedInUrl = linkedInUrl;
  }

  get getGithubUrl(): string {
    return this.githubUrl;
  }

  set setGithubUrl(githubUrl: string) {
    this.githubUrl = githubUrl;
  }

  get getTwitterUrl(): string {
    return this.twitterUrl;
  }

  set setTwitterUrl(twitterUrl: string) {
    this.twitterUrl = twitterUrl;
  }

  get getUserSkills(): string {
    return this.userSkills;
  }

  set setUserSkills(userSkills: string) {
    this.userSkills = userSkills;
  }

  get getUserOTP(): string {
    return this.userOTP;
  }

  set setUserOTP(userOTP: string) {
    this.userOTP = userOTP;
  }
}
