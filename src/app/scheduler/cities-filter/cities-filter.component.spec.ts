import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CitiesFilterComponent } from './cities-filter.component';

describe('CitiesFilterComponent', () => {
  let component: CitiesFilterComponent;
  let fixture: ComponentFixture<CitiesFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CitiesFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CitiesFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
