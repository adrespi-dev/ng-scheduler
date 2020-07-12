import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { DayCellComponent } from "./day-cell.component";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { MaterialModule } from "src/app/shared/material.module";
import { SatPopoverModule } from "@ncstate/sat-popover";

describe("DayCellComponent", () => {
  let component: DayCellComponent;
  let fixture: ComponentFixture<DayCellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DayCellComponent],
      imports: [HttpClientTestingModule, MaterialModule, SatPopoverModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DayCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
