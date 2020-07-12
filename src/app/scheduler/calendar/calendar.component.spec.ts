import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CalendarComponent } from "./calendar.component";
import { SatPopoverModule } from "@ncstate/sat-popover";

describe("CalendarComponent", () => {
  let component: CalendarComponent;
  let fixture: ComponentFixture<CalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CalendarComponent],
      imports: [SatPopoverModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
