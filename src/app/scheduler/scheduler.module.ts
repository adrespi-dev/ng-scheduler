import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SchedulerRoutingModule } from './scheduler-routing.module';
import { SchedulerComponent } from './scheduler.component';
import { CalendarComponent } from './calendar/calendar.component';


@NgModule({
  declarations: [SchedulerComponent, CalendarComponent],
  imports: [
    CommonModule,
    SchedulerRoutingModule
  ]
})
export class SchedulerModule { }
