import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VolunteerLayout } from './volunteer-layout';

describe('VolunteerLayout', () => {
  let component: VolunteerLayout;
  let fixture: ComponentFixture<VolunteerLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VolunteerLayout]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VolunteerLayout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
