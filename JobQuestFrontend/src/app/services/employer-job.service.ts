import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JobDetailInfoModel } from '../models/job-detail-info-model';
import { HttpClient } from '@angular/common/http';
import { UserAppliedJob } from '../models/user-applied-job';

@Injectable({
  providedIn: 'root',
})
export class EmployerJobService {
  private baseUrl = 'http://localhost:8080/employer';
  private baseUrlEmployee = 'http://localhost:8080/employee';
  constructor(private http: HttpClient) {}

  getJobProfileData = (jobId: number): Observable<JobDetailInfoModel> => {
    return this.http.get<JobDetailInfoModel>(
      `${this.baseUrlEmployee}/getSingleJob?jobId=${jobId}`
    );
  };

  saveJobInfoCompany = (
    job: JobDetailInfoModel
  ): Observable<JobDetailInfoModel> => {
    return this.http.post<JobDetailInfoModel>(
      `${this.baseUrl}/saveJobInfoCompany`,
      job
    );
  };

  getAllJobsOfCompany = (compId: number): Observable<JobDetailInfoModel[]> => {
    return this.http.get<JobDetailInfoModel[]>(
      `${this.baseUrl}/getAllJobsOfCompany?compId=${compId}`
    );
  };

  getAppliedUsersOfCompany = (compId: number): Observable<UserAppliedJob[]> => {
    return this.http.get<UserAppliedJob[]>(
      `${this.baseUrl}/getAllAppliedUsers?compId=${compId}`
    );
  };

  getAcceptEmail = (userEmail: string, jobName: string) => {
    return this.http.get(
      `${this.baseUrlEmployee}/sendAcceptEmail?userEmail=${userEmail}&&jobName=${jobName}`
    );
  };

  getRejectEmail = (userEmail: string, jobName: string) => {
    return this.http.get(
      `${this.baseUrlEmployee}/sendRejectEmail?userEmail=${userEmail}&&jobName=${jobName}`
    );
  };

  removeAppliedUser = (jobId: number, compId: number, userId: number) => {
    return this.http.delete(
      `${this.baseUrl}/removeAppliedUser?jobId=${jobId}&&compId=${compId}&&userId=${userId}`,
      { responseType: 'text' as 'json' }
    );
  };

  getPdfOfUser = (userId: number) => {
    return this.http.get('http://localhost:8080/api/pdf/download/' + userId, {
      responseType: 'arraybuffer',
    });
  };

  editJobInfoCompany = (
    jobId: number,
    job: JobDetailInfoModel
  ): Observable<JobDetailInfoModel> => {
    return this.http.put<JobDetailInfoModel>(
      `${this.baseUrl}/editJobInfoCompany?jobId=${jobId}`,
      job
    );
  };

  toggleJobIsActiveStatus = (
    jobId: number,
    jobIsActiveStatus: boolean
  ): Observable<JobDetailInfoModel> => {
    return this.http.put<JobDetailInfoModel>(
      `${this.baseUrl}/toggleJobIsActiveStatus?jobId=${jobId}`,
      jobIsActiveStatus
    );
  };

  deleteJobById = (jobId: number): Observable<string> => {
    return this.http.delete<string>(
      `${this.baseUrl}/deleteJobById?jobId=${jobId}`,
      { responseType: 'text' as 'json' }
    );
  };
}
