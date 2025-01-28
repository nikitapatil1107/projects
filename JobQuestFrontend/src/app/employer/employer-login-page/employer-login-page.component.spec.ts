import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployerLoginPageComponent } from './employer-login-page.component';

describe('EmployerLoginPageComponent', () => {
  let component: EmployerLoginPageComponent;
  let fixture: ComponentFixture<EmployerLoginPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmployerLoginPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmployerLoginPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
