import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignVolunteers } from './campaign-volunteers';

describe('CampaignVolunteers', () => {
  let component: CampaignVolunteers;
  let fixture: ComponentFixture<CampaignVolunteers>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CampaignVolunteers]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CampaignVolunteers);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
