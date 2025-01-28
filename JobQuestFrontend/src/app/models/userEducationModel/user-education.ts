import { UserProfile } from "../userProfile/user-profile";

export class UserEducation {
  userEduId: number;
  collegeName: string;
  graduationYear: number;
  degreeMajor: string;
  gpaScore: number;
  user_id: UserProfile

  constructor(
    userEduId: number,
    collegeName: string,
    graduationYear: number,
    degreeMajor: string,
    gpaScore: number,
    user?: UserProfile,
  ) {
    this.userEduId = userEduId;
    this.collegeName = collegeName;
    this.graduationYear = graduationYear;
    this.degreeMajor = degreeMajor;
    this.gpaScore = gpaScore;
    this.user_id = user || new UserProfile()
  }
}
