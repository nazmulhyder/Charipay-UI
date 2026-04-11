import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VolunteerTasks } from './volunteer-tasks';

describe('VolunteerTasks', () => {
  let component: VolunteerTasks;
  let fixture: ComponentFixture<VolunteerTasks>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VolunteerTasks]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VolunteerTasks);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
