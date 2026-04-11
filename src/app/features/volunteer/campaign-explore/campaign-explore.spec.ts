import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignExplore } from './campaign-explore';

describe('CampaignExplore', () => {
  let component: CampaignExplore;
  let fixture: ComponentFixture<CampaignExplore>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CampaignExplore]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CampaignExplore);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
