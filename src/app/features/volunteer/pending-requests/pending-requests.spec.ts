import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingRequests } from './pending-requests';

describe('PendingRequests', () => {
  let component: PendingRequests;
  let fixture: ComponentFixture<PendingRequests>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PendingRequests]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PendingRequests);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
