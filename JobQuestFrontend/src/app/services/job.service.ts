import { Injectable } from '@angular/core';
import { JobDetailInfoModel } from '../models/job-detail-info-model';
import { Observable } from 'rxjs';
import { Company } from '../models/companyModel/company';
import { Event } from '../models/eventModel/event';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { AppliedJobInfoModel } from '../models/appliedJobs/applied-job-info.model';
import { SavedJobs } from '../models/savedJobs/saved-jobs';
@Injectable({
  providedIn: 'root',
})
export class JobService {
  private baseUrl = 'http://localhost:8080/employee';
  constructor(private http: HttpClient) {}

  getAllJobs = (): Observable<JobDetailInfoModel[]> => {
    return this.http.get<JobDetailInfoModel[]>(`${this.baseUrl}/getAllJobs`);
  };

  searchCompanyByName(name: string): Observable<Company[]> {
    return this.http.get<Company[]>(
      `${this.baseUrl}/search?searchText=${name}`
    );
  }

  singleJobPage = (jobId: string): Observable<JobDetailInfoModel> => {
    return this.http.get<JobDetailInfoModel>(
      `${this.baseUrl}/singleJob?jobId=${jobId}`
    );
  };

  fetchUserAppliedJobs = (userId: number) => {
    return this.http.get<any>(
      `${this.baseUrl}/fetchAppliedJobs?userId=${userId}`
    );
  };

  fetchUserAlreadyApplied = (
    userId: string,
    jobId: string
  ): Observable<boolean> => {
    return this.http.get<boolean>(
      `${this.baseUrl}/fetchAlreadyApplied?userId=${userId}&jobId=${jobId}`
    );
  };

  applyJob = (
    appliedJobInfo: AppliedJobInfoModel
  ): Observable<AppliedJobInfoModel> => {
    return this.http.post<AppliedJobInfoModel>(
      `${this.baseUrl}/applyJob`,
      appliedJobInfo
    );
  };

  removeUserAppliedJob = (
    userId: string,
    jobId: string
  ): Observable<boolean> => {
    return this.http.delete<boolean>(
      `${this.baseUrl}/removeAppliedJob?jobId=${jobId}&userId=${userId}`
    );
  };
  getJobsByTagName = (tagName: string): Observable<JobDetailInfoModel[]> => {
    return this.http.get<JobDetailInfoModel[]>(
      `${this.baseUrl}/getJobsByTag?tagName=${tagName}`
    );
  };
  getJobsByJobName = (jobName: string): Observable<JobDetailInfoModel[]> => {
    return this.http.get<JobDetailInfoModel[]>(
      `${this.baseUrl}/getJobsByJobName?jobName=${jobName}`
    );
  };

  getJobsOfCompany = (compId: number): Observable<any> => {
    return this.http.get<any>(
      `${this.baseUrl}/getSingleCompany?compId=${compId}`
    );
  };

  getAppliedEventsOfUser = (userId: number): Observable<Event[]> => {
    return this.http.get<Event[]>(
      `${this.baseUrl}/getAppliedEvents?userId=${userId}`
    );
  };
  // getJobsByTagName = (): Observable<JobDetailInfoModel[]> => {
  //   return this.http.get<JobDetailInfoModel[]>(`${this.baseUrl}/getJobsByTag`);
  // };

  searchJobsByName(name: string): Observable<JobDetailInfoModel[]> {
    return this.http.get<JobDetailInfoModel[]>(
      `${this.baseUrl}/searchByJobName?searchText=${name}`
    );
  }
  searchEventByName(name: string): Observable<Event[]> {
    return this.http.get<Event[]>(
      `${this.baseUrl}/searchbyEventName?searchText=${name}`
    );
  }

  filterJobsByCompanyType(companyTypes: string[]) {
    if (companyTypes.length === 0) {
      return this.http.get<any[]>('/api/jobs');
    }

    return this.http
      .get<any[]>('/api/jobs')
      .pipe(
        map((jobs) => jobs.filter((job) => companyTypes.includes(job.compType)))
      );
  }

  filterJobsByWorkMode(WorkModes: string[]) {
    if (WorkModes.length === 0) {
      return this.http.get<any[]>('/api/jobs');
    }
    return this.http
      .get<any[]>('/api/jobs')
      .pipe(
        map((jobs) => jobs.filter((job) => WorkModes.includes(job.workMode)))
      );
  }

  getFeedbackFilledValue = (): boolean => {
    if (typeof sessionStorage !== 'undefined') {
      return sessionStorage.getItem('isFeedbackFilled') !== null;
    }
    return false;
  };

  saveJob = (savedJobInfo:SavedJobs): Observable<SavedJobs> => {
    return this.http.post<SavedJobs>(`${this.baseUrl}/saveJob`, savedJobInfo);
  }

  getSavedJobs = (userId: number): Observable<JobDetailInfoModel[]> => {
    return this.http.get<JobDetailInfoModel[]>(`${this.baseUrl}/fetchSavedJobs?userId=${userId}`);
  }

  removeSavedJob = (userId: number, jobId: number):Observable<boolean> => {
    return this.http.delete<boolean>(`${this.baseUrl}/removeSavedJob?userId=${userId}&jobId=${jobId}`)
  }
}
