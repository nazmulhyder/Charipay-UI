import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Impacts } from './impacts';

describe('Impacts', () => {
  let component: Impacts;
  let fixture: ComponentFixture<Impacts>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Impacts]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Impacts);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
