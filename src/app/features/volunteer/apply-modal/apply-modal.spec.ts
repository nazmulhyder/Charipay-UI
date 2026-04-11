import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplyModal } from './apply-modal';

describe('ApplyModal', () => {
  let component: ApplyModal;
  let fixture: ComponentFixture<ApplyModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApplyModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApplyModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
