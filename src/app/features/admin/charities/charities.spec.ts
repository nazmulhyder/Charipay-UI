import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Charities } from './charities';

describe('Charities', () => {
  let component: Charities;
  let fixture: ComponentFixture<Charities>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Charities]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Charities);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
