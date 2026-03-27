import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnMore } from './learn-more';

describe('LearnMore', () => {
  let component: LearnMore;
  let fixture: ComponentFixture<LearnMore>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LearnMore]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LearnMore);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
