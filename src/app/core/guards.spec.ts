import { TestBed } from '@angular/core/testing';
import { Guards } from './AuthGuards';



describe('Guards', () => {
  let service: Guards;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Guards);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
