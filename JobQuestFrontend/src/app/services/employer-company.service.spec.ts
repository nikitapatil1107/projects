import { TestBed } from '@angular/core/testing';

import { EmployerCompanyService } from './employer-company.service';

describe('EmployerCompanyService', () => {
  let service: EmployerCompanyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployerCompanyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
