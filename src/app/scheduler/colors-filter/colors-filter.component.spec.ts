import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorsFilterComponent } from './colors-filter.component';

describe('ColorsFilterComponent', () => {
  let component: ColorsFilterComponent;
  let fixture: ComponentFixture<ColorsFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColorsFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColorsFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
