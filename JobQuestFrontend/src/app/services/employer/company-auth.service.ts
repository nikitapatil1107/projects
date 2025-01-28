import { Injectable } from '@angular/core';
import { Company } from '../../models/companyModel/company';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompanyAuthService {

  private baseUrl = 'http://localhost:8080/employer';
  companyInfo: Company = new Company();

  constructor(private http: HttpClient) { }

  registerCompany = (compInfo: Company):Observable<Company> => {
    return this.http.post<Company>(`${this.baseUrl}/registerCompany`, compInfo)
  }

  loginCompany = (compCred: Company):Observable<Company> => {
    return this.http.post<Company>(`${this.baseUrl}/loginCompany`, compCred);
  }
}
