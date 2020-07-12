import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ReminderOverviewComponent } from "./reminder-overview.component";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { MaterialModule } from "src/app/shared/material.module";

describe("ReminderOverviewComponent", () => {
  let component: ReminderOverviewComponent;
  let fixture: ComponentFixture<ReminderOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ReminderOverviewComponent],
      imports: [HttpClientTestingModule, MaterialModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReminderOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
