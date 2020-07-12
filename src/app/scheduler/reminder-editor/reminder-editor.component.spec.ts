import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ReminderEditorComponent } from "./reminder-editor.component";
import { SharedModule } from "src/app/shared/shared.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientTestingModule } from "@angular/common/http/testing";

describe("ReminderEditorComponent", () => {
  let component: ReminderEditorComponent;
  let fixture: ComponentFixture<ReminderEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ReminderEditorComponent],
      imports: [BrowserAnimationsModule, SharedModule, HttpClientTestingModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReminderEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
