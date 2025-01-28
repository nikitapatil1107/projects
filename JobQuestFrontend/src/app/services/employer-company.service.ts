import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Company } from '../models/companyModel/company';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class EmployerCompanyService {
  compId: number = 0;
  compEmail: string | null = '';

  private baseUrl = 'http://localhost:8080/employer';

  constructor(private http: HttpClient) {}

  getLoginStatus(): boolean {
    if (typeof sessionStorage !== 'undefined') {
      if (sessionStorage.getItem('comp_id') != null) {
        this.compId = parseInt(sessionStorage.getItem('comp_id')!);
      }
      this.compEmail = sessionStorage.getItem('comp_email');
      if (this.compId) {
        return true;
      }
      return false;
    }
    return false;
  }

  getCompanyId = (): number => {
    if (typeof sessionStorage !== 'undefined') {
      if (sessionStorage.getItem('comp_id') != null) {
        this.compId = parseInt(sessionStorage.getItem('comp_id')!);
      }
      if (this.compId) {
        return this.compId;
      }
      return -1;
    }
    return -1;
  };

  getCompanyProfileData = (compId: number): Observable<Company> => {
    return this.http.get<Company>(
      `${this.baseUrl}/getCompanyDetail?compId=${compId}`
    );
  };

  saveBasicInfoCompany = (
    compId: number,
    company: Company
  ): Observable<Company> => {
    return this.http.put<Company>(
      `${this.baseUrl}/putBasicCompanyInfo?compId=${compId}`,
      company
    );
  };

  saveMoreInfoCompany = (
    compId: number,
    company: Company
  ): Observable<Company> => {
    return this.http.put<Company>(
      `${this.baseUrl}/putMoreInfoCompany?compId=${compId}`,
      company
    );
  };

  saveImageTagsCompanyInfo = (compId: number, company: Company) => {
    return this.http.put<Company>(
      `${this.baseUrl}/putImageTagsInfoCompany?compId=${compId}`,
      company
    );
  };
}
