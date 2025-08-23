import { TestBed } from '@angular/core/testing';

import { RuleGuards } from './rule-guards';

describe('RuleGuards', () => {
  let service: RuleGuards;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RuleGuards);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
