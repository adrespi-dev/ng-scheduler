import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SchedulerRoutingModule } from "./scheduler-routing.module";
import { SchedulerComponent } from "./scheduler.component";
import { CalendarComponent } from "./calendar/calendar.component";
import { DayCellComponent } from "./calendar/day-cell/day-cell.component";
import { SharedModule } from "../shared/shared.module";

@NgModule({
  declarations: [SchedulerComponent, CalendarComponent, DayCellComponent],
  imports: [CommonModule, SchedulerRoutingModule, SharedModule],
})
export class SchedulerModule {}
