import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Company } from '../models/companyModel/company';
import { Event } from '../models/eventModel/event';
import { UserProfile } from '../models/userProfile/user-profile';
import { UserWorkExperience } from '../models/userWorkExperienceModel/user-work-experience';
import { UserEducation } from '../models/userEducationModel/user-education';

@Injectable({
  providedIn: 'root',
})
export class UserProfileService {
  private baseUrl = 'http://localhost:8080/employee';

  constructor(private http: HttpClient) {}

  userEmail: string | null = '';
  userId: number | null = 0;
  userName: string | null = '';
  isLoggedIn: boolean = false;

  // Method to get login status from browser storage
  getLoginStatus(): boolean {
    if (typeof sessionStorage !== 'undefined') {
      if (sessionStorage.getItem('user_id') != null) {
        this.userId = parseInt(sessionStorage.getItem('user_id')!);
      }
      this.userEmail = sessionStorage.getItem('user_email');
      if (this.userId) {
        return true;
      }
      return false;
    }
    return false;
  }

  getEmailOfLoggedInUser = (): string => {
    if (typeof sessionStorage !== 'undefined') {
      if (sessionStorage.getItem('user_id') != null) {
        this.userId = parseInt(sessionStorage.getItem('user_id')!);
        this.userEmail = sessionStorage.getItem('user_email');
      }
      return this.userEmail ?? '';
    }
    return '';
  };

  getNameOfLoggedInUser = (): string => {
    if (typeof sessionStorage !== 'undefined') {
      if (sessionStorage.getItem('user_name') != null) {
        this.userName = sessionStorage.getItem('user_name');
      }
      return this.userName ?? '';
    }
    return '';
  };

  toggleLogInStatus = (): boolean => {
    this.isLoggedIn = !this.isLoggedIn;
    return this.isLoggedIn;
  };

  getLoggedInUserId = (): number => {
    if (typeof sessionStorage !== 'undefined') {
      if (sessionStorage.getItem('user_id') != null) {
        this.userId = parseInt(sessionStorage.getItem('user_id')!);
      }
      if (this.userId) {
        return this.userId;
      }
      return -1;
    }
    return -1;
  };

  getUserProfileDataOfUser = (userId: number): Observable<UserProfile> => {
    return this.http.get<UserProfile>(
      `${this.baseUrl}/getUserProfile?userId=${userId}`
    );
  };

  saveBasicInfoUserData = (
    userId: number,
    userProfile: UserProfile
  ): Observable<UserProfile> => {
    return this.http.put<UserProfile>(
      `${this.baseUrl}/saveBasicUserInfo?userId=${userId}`,
      userProfile
    );
  };

  saveSocialInfoOfUser = (
    userId: number,
    userProfile: UserProfile
  ): Observable<UserProfile> => {
    return this.http.put<UserProfile>(
      `${this.baseUrl}/saveSocialInfoUser?userId=${userId}`,
      userProfile
    );
  };

  saveWorkExperienceOfUser = (
    workExp: UserWorkExperience
  ): Observable<UserWorkExperience> => {
    return this.http.post<UserWorkExperience>(
      `${this.baseUrl}/saveWorkExperienceUser`,
      workExp
    );
  };

  saveUserEducationData = (
    userEducation: UserEducation
  ): Observable<UserEducation> => {
    return this.http.post<UserEducation>(
      `${this.baseUrl}/saveUserEducation`,
      userEducation
    );
  };

  saveUserSelectedSkills = (
    userId: number,
    userProfile: UserProfile
  ): Observable<UserProfile> => {
    return this.http.put<UserProfile>(
      `${this.baseUrl}/saveSelectedSkills?userId=${userId}`,
      userProfile
    );
  };

  uploadPdfToDatabase = (
    formData: FormData,
    userId: number
  ): Observable<string> => {
    return this.http.post<string>(
      `http://localhost:8080/api/pdf/upload?userId=${userId}`,
      formData,
      {
        responseType: 'text' as 'json',
      }
    );
  };

  getResume = (userId: number): Observable<any> => {
    return this.http.get('http://localhost:8080/api/pdf/download/' + userId, {
      responseType: 'arraybuffer',
    });
  };

  // Method to clear login status
  clearLoginStatus(): void {
    if (typeof sessionStorage !== 'undefined') {
      sessionStorage.removeItem('user_id');
    }
  }

  getAllCompaniesData = (): Observable<Company[]> => {
    return this.http.get<Company[]>(`${this.baseUrl}/getAllCompanies`);
  };
  getAllEvents = (): Observable<Event[]> => {
    return this.http.get<Event[]>(`${this.baseUrl}/getAllEvents`);
  };

  getNameOfPdf = (userId: number): Observable<string> => {
    return this.http.get<string>(
      `http://localhost:8080/api/pdf/getNameOfPdf?userId=${userId}`,
      { responseType: 'text' as 'json' }
    );
  };

  deleteWorkExpOfUSer = (userWorkExpId: number): Observable<string> => {
    return this.http.delete<string>(
      `${this.baseUrl}/deleteWorkExpOfUser?workExpId=${userWorkExpId}`,
      { responseType: 'text' as 'json' }
    );
  };

  deleteUserEducation = (userEduId: number): Observable<string> => {
    return this.http.delete<string>(
      `${this.baseUrl}/deleteUserEducation?eduId=${userEduId}`,
      { responseType: 'text' as 'json' }
    );
  };
}
