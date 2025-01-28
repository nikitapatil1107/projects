import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAppliedUsersComponent } from './view-applied-users.component';

describe('ViewAppliedUsersComponent', () => {
  let component: ViewAppliedUsersComponent;
  let fixture: ComponentFixture<ViewAppliedUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewAppliedUsersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewAppliedUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
