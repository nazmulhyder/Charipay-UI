import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharityProfile } from './charity-profile';

describe('CharityProfile', () => {
  let component: CharityProfile;
  let fixture: ComponentFixture<CharityProfile>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharityProfile]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CharityProfile);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
