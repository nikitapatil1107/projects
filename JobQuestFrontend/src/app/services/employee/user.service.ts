import { Injectable } from '@angular/core';
import { UserProfile } from '../../models/userProfile/user-profile';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = 'http://localhost:8080/employee';
  user: UserProfile = new UserProfile();

  constructor(private http: HttpClient) {}

  registerUser(user: UserProfile): Observable<UserProfile> {
    return this.http.post<UserProfile>(`${this.baseUrl}/registerUser`, user);
  }

  loginUser(user: UserProfile): Observable<UserProfile> {
    return this.http.post<UserProfile>(`${this.baseUrl}/loginUser`, user);
  }

  sendOTP(email: string) {
    return this.http.get(`${this.baseUrl}/sendOtp?userEmail=${email}`);
  }

  verifyOTP(otp: string, email: string) {
    return this.http.get(`${this.baseUrl}/verifyOtp?userOTP=${otp}&userEmail=${email}`);
  }

  resetPassword(userInfo: any) {
    return this.http.post(`${this.baseUrl}/resetPassword`, userInfo);
  }

  changePassword(passwordInfo: any) {
    return this.http.post(`${this.baseUrl}/changeUserPassword`, passwordInfo);
  }
}
