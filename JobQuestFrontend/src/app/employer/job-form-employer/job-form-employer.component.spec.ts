import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobFormEmployerComponent } from './job-form-employer.component';

describe('JobFormEmployerComponent', () => {
  let component: JobFormEmployerComponent;
  let fixture: ComponentFixture<JobFormEmployerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JobFormEmployerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JobFormEmployerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
