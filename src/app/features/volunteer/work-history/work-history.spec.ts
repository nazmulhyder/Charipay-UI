import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkHistory } from './work-history';

describe('WorkHistory', () => {
  let component: WorkHistory;
  let fixture: ComponentFixture<WorkHistory>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkHistory]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkHistory);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
