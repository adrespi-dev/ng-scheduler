import { Injectable } from "@angular/core";
import { CurrentDateService } from "./current-date.service";
import { map } from "rxjs/operators";
import DayData from "../models/day-data";
import { RemindersService } from "./reminders.service";
import { combineLatest, Observable } from "rxjs";
import Reminder from "../models/reminder";

const SUNDAY_WEEKDAY = 0;
const SATURDAY_WEEKDAY = 6;

interface CalendarsDataModel {
  startOfMonth: moment.Moment;
  endOfMonth: moment.Moment;
  dataSource: DayData[];
}

@Injectable({
  providedIn: "root",
})
export class CalendarDaysProviderService {
  currentMonth: moment.Moment;

  constructor(
    private cdService: CurrentDateService,
    private remindersService: RemindersService
  ) {}

  get calendarDaysDataSource$() {
    return combineLatest([
      this._calendarDataSource$,
      this.remindersService.reminders$,
    ]).pipe(map((result) => this.assignRemindersToDays(result[0], result[1])));
  }

  private assignRemindersToDays(
    calendarsDayData: CalendarsDataModel,
    reminders: Reminder[]
  ) {
    this.currentMonth = calendarsDayData.startOfMonth.startOf("month");
    const ds: DayData[] = calendarsDayData.dataSource;
    ds.forEach((r) => (r.reminders = []));

    reminders.forEach((rem) => {
      const dayData = ds.find((r) => {
        return r.dateTimeMoment.isSame(rem.dateTime, "date");
      });
      if (dayData) {
        dayData.reminders.push(rem);
      }
    });

    return calendarsDayData;
  }

  private get _calendarDataSource$(): Observable<CalendarsDataModel> {
    return this.cdService.currentMonth$.pipe(
      map((newDate) => {
        const startOfMonth = newDate.clone().startOf("month").startOf("day");
        const endOfMonth = newDate.clone().endOf("month").startOf("day");

        let iterationDate = startOfMonth.clone();
        let endOfRange = endOfMonth.clone();

        // if start of month is distinct to sunday,
        // we will have to add days from last month
        if (iterationDate.weekday() !== SUNDAY_WEEKDAY) {
          iterationDate.add(-iterationDate.weekday(), "days");
        }

        // if end of month is distinct to saturday,
        // we will have to add days from next month
        if (endOfRange.weekday() !== SATURDAY_WEEKDAY) {
          endOfRange.add(SATURDAY_WEEKDAY - endOfRange.weekday(), "days");
        }

        const dataSource: DayData[] = [];
        while (iterationDate <= endOfRange) {
          const weekday = iterationDate.weekday();
          dataSource.push({
            dateTime: iterationDate.toDate(),
            dateTimeMoment: iterationDate.clone(),
            dayInCurrentMonth:
              iterationDate.get("month") == startOfMonth.get("month"),
            isWeekend: weekday == SUNDAY_WEEKDAY || weekday == SATURDAY_WEEKDAY,
            isCurrentDay: iterationDate.isSame(new Date(), "day"),
            reminders: [],
          });
          iterationDate = iterationDate.add(1, "days");
        }

        return {
          startOfMonth,
          endOfMonth,
          dataSource,
        };
      })
    );
  }
}
