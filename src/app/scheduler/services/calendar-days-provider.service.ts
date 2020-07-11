import { Injectable } from "@angular/core";
import { CurrentDateService } from "./current-date.service";
import { map } from "rxjs/operators";
import * as moment from "moment";
import DayData from "../models/day-data";

const SUNDAY_WEEKDAY = 0;
const SATURDAY_WEEKDAY = 6;

@Injectable({
  providedIn: "root",
})
export class CalendarDaysProviderService {
  constructor(private cdService: CurrentDateService) {}

  get calendarDaysDataSource$() {
    return this.cdService.currentDate$.pipe(
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
