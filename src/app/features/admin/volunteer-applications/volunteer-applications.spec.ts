import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VolunteerApplications } from './volunteer-applications';

describe('VolunteerApplications', () => {
  let component: VolunteerApplications;
  let fixture: ComponentFixture<VolunteerApplications>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VolunteerApplications]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VolunteerApplications);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
