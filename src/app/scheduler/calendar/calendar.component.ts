import { Component, OnInit, OnDestroy, HostListener } from "@angular/core";
import * as moment from "moment";
import { CurrentDateService } from "../services/current-date.service";
import { Subscription } from "rxjs";
import DayData from "../models/day-data";
import { CalendarDaysProviderService } from "../services/calendar-days-provider.service";
import memoizee from "src/app/shared/utils/memoizee-decorator";

@Component({
  selector: "[app-calendar]",
  templateUrl: "./calendar.component.html",
  styleUrls: ["./calendar.component.scss"],
})
export class CalendarComponent implements OnInit, OnDestroy {
  isAnimating = true;
  animationType: "next-month-transition" | "previous-month-transition" = null;

  daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  providerSub: Subscription;

  startOfMonth: moment.Moment;
  endOfMonth: moment.Moment;

  dataSource: DayData[] = [];

  constructor(
    private provider: CalendarDaysProviderService,
    private cdService: CurrentDateService
  ) {}

  ngOnInit(): void {
    this.providerSub = this.provider.calendarDaysDataSource$.subscribe(
      (data) => {
        this.isAnimating = true;

        if (data.startOfMonth.isBefore(this.startOfMonth)) {
          // we are changing to a previous month
          this.animationType = "previous-month-transition";
        } else {
          this.animationType = "next-month-transition";
        }

        this.dataSource = data.dataSource;
        this.startOfMonth = data.startOfMonth;
        this.endOfMonth = data.endOfMonth;

        setTimeout(() => {
          this.isAnimating = false;
        }, 1);
      }
    );

    this.onMousewheel = this.onMousewheel.bind(this);
  }

  ngOnDestroy() {
    this.providerSub.unsubscribe();
  }

  clearDataSource() {
    this.dataSource = [];
  }

  /**
   * Note that by using memoizee decorator we will just execute this function only when the
   * actual datasource parameter is changed.
   */
  @memoizee()
  groupDataSource(dataSource: DayData[]) {
    const rowGroups = new Array(Math.ceil(dataSource.length / 7))
      .fill(null)
      .map((_) => dataSource.splice(0, 7));
    console.log(rowGroups);
    return rowGroups;
  }

  @HostListener("mousewheel", ["$event"])
  onMousewheel(event) {
    console.log(this.cdService);
    if (event.wheelDelta > 0) {
      this.cdService.goToPreviousMonth();
    }
    if (event.wheelDelta < 0) {
      this.cdService.goToNextMonth();
    }
  }
}
