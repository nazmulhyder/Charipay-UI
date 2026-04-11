import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressUpdate } from './progress-update';

describe('ProgressUpdate', () => {
  let component: ProgressUpdate;
  let fixture: ComponentFixture<ProgressUpdate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgressUpdate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProgressUpdate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
