import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewResumeEmployerComponent } from './overview-resume-employer.component';

describe('OverviewResumeEmployerComponent', () => {
  let component: OverviewResumeEmployerComponent;
  let fixture: ComponentFixture<OverviewResumeEmployerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OverviewResumeEmployerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OverviewResumeEmployerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
