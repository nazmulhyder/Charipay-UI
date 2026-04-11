import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VolunteerRequests } from './volunteer-requests';

describe('VolunteerRequests', () => {
  let component: VolunteerRequests;
  let fixture: ComponentFixture<VolunteerRequests>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VolunteerRequests]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VolunteerRequests);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
