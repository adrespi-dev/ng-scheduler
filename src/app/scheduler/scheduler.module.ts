import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SchedulerRoutingModule } from "./scheduler-routing.module";
import { SchedulerComponent } from "./scheduler.component";
import { CalendarComponent } from "./calendar/calendar.component";
import { DayCellComponent } from "./calendar/day-cell/day-cell.component";
import { SharedModule } from "../shared/shared.module";
import { ReminderEditorComponent } from "./reminder-editor/reminder-editor.component";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    SchedulerComponent,
    CalendarComponent,
    DayCellComponent,
    ReminderEditorComponent,
  ],
  imports: [
    CommonModule,
    SchedulerRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class SchedulerModule {}
