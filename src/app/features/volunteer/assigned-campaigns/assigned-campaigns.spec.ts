import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignedCampaigns } from './assigned-campaigns';

describe('AssignedCampaigns', () => {
  let component: AssignedCampaigns;
  let fixture: ComponentFixture<AssignedCampaigns>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssignedCampaigns]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignedCampaigns);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
