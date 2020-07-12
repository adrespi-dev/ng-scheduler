import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DayOverflowComponent } from './day-overflow.component';

describe('DayOverflowComponent', () => {
  let component: DayOverflowComponent;
  let fixture: ComponentFixture<DayOverflowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DayOverflowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DayOverflowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
