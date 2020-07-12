import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import DayData from "../models/day-data";
import Reminder from "../models/reminder";

@Injectable({
  providedIn: "root",
})
export class ReminderEditingService {
  private _openReminderPopover$ = new Subject<{
    isNewReminder: boolean;
    templateRef: any;
    dayData?: DayData;
    reminder?: Reminder;
  }>();
  reminderPopoverClosed$ = new Subject();

  constructor() {}

  get reminderPopoverOpen$() {
    return this._openReminderPopover$.asObservable();
  }

  openNewReminder(templateRef: any, dayData: DayData) {
    this._openReminderPopover$.next({
      isNewReminder: true,
      templateRef,
      dayData,
    });
  }

  openReminderEditor(templateRef: any, reminder: Reminder) {
    this._openReminderPopover$.next({
      isNewReminder: false,
      templateRef,
      reminder,
    });
  }
}
