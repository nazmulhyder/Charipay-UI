import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturedCampaigns } from './featured-campaigns';

describe('FeaturedCampaigns', () => {
  let component: FeaturedCampaigns;
  let fixture: ComponentFixture<FeaturedCampaigns>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeaturedCampaigns]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeaturedCampaigns);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
