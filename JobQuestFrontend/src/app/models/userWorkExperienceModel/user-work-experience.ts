import { UserProfile } from '../userProfile/user-profile';

export class UserWorkExperience {
  workExpId: number;
  companyName: string;
  titleName: string;
  startDate: string;
  endDate: string;
  workDescription: string;
  user_id: UserProfile;

  constructor(
    workExpId: number,
    companyName: string,
    titleName: string,
    startDate: string,
    endDate: string,
    workDescription: string,
    user?: UserProfile
  ) {
    this.workExpId = workExpId;
    this.companyName = companyName;
    this.titleName = titleName;
    this.startDate = startDate;
    this.endDate = endDate;
    this.workDescription = workDescription;
    this.user_id = user || new UserProfile();
  }
}
