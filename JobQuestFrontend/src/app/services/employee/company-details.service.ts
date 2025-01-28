import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Company } from '../../models/companyModel/company';

@Injectable({
  providedIn: 'root',
})
export class CompanyDetailsService {
  private baseUrl = 'http://localhost:8080/employee';
  companyDetails: Company = new Company();

  constructor(private http: HttpClient) {}

  fetchCompanyDetails(compId: number): Observable<Company> {
    return this.http.get<Company>(
      `${this.baseUrl}/companyDetails?companyId=${compId}`
    );
  }

  fetchCompaniesWithTags(compTag: string): Observable<any> {
    return this.http.get<any>(
      `${this.baseUrl}/companyList?companyTag=${compTag}`
    );
  }

  fetchAllCompanies = (): Observable<Company[]> => {
    return this.http.get<Company[]>(`${this.baseUrl}/getAllCompanies`);
  };
}
