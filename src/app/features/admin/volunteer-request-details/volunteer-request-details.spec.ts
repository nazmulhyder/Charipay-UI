import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VolunteerRequestDetails } from './volunteer-request-details';

describe('VolunteerRequestDetails', () => {
  let component: VolunteerRequestDetails;
  let fixture: ComponentFixture<VolunteerRequestDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VolunteerRequestDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VolunteerRequestDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
