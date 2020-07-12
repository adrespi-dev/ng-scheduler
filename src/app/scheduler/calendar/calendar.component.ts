import {
  Component,
  OnInit,
  OnDestroy,
  HostListener,
  TemplateRef,
  ViewChild,
} from "@angular/core";
import * as moment from "moment";
import { CurrentDateService } from "../services/current-date.service";
import { Subscription } from "rxjs";
import DayData from "../models/day-data";
import { CalendarDaysProviderService } from "../services/calendar-days-provider.service";
import memoizee from "src/app/shared/utils/memoizee-decorator";
import { SatPopover } from "@ncstate/sat-popover";
import { ReminderEditingService } from "../services/reminder-editing.service";
import Reminder from "../models/reminder";
@Component({
  selector: "[app-calendar]",
  templateUrl: "./calendar.component.html",
  styleUrls: ["./calendar.component.scss"],
})
export class CalendarComponent implements OnInit, OnDestroy {
  @ViewChild("reminderPopover") popOver: SatPopover;

  isAnimating = true;
  animationType: "next-month-transition" | "previous-month-transition" = null;

  daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  providerSub: Subscription;

  startOfMonth: moment.Moment;
  endOfMonth: moment.Moment;

  dataSource: DayData[] = [];

  editingElementRef: any;
  editingDayData: DayData;
  editingReminder: Reminder;

  reminderEditingSub: Subscription;

  constructor(
    private provider: CalendarDaysProviderService,
    private cdService: CurrentDateService,
    private reminderEditingService: ReminderEditingService
  ) {}

  ngOnInit(): void {
    this.providerSub = this.provider.calendarDaysDataSource$.subscribe(
      (data) => {
        this.isAnimating = false;

        const isSameMonth = data.startOfMonth.isSame(
          this.startOfMonth,
          "month"
        );

        if (!isSameMonth) {
          this.isAnimating = true;
          if (data.startOfMonth.isBefore(this.startOfMonth)) {
            // we are changing to a previous month
            this.animationType = "previous-month-transition";
          } else {
            this.animationType = "next-month-transition";
          }
        } else {
          this.isAnimating = false;
        }

        this.dataSource = data.dataSource;
        this.startOfMonth = data.startOfMonth;
        this.endOfMonth = data.endOfMonth;

        if (!isSameMonth) {
          setTimeout(() => {
            this.isAnimating = false;
          }, 1);
        }
      }
    );

    this.reminderEditingSub = this.reminderEditingService.reminderPopoverOpen$.subscribe(
      (data) => {
        this.editingElementRef = null;
        this.editingDayData = null;
        this.editingReminder = null;

        if (data.isNewReminder) {
          this.editingElementRef = data.templateRef;
          this.editingDayData = data.dayData;
        } else {
          this.editingElementRef = data.templateRef;
          this.editingReminder = data.reminder;
        }

        setTimeout(() => {
          this.popOver.open();
        }, 50);
      }
    );

    this.onMousewheel = this.onMousewheel.bind(this);
  }

  ngOnDestroy() {
    this.providerSub.unsubscribe();
    this.reminderEditingSub.unsubscribe();
  }

  clearDataSource() {
    this.dataSource = [];
  }

  handledPopoverClosed() {
    this.editingElementRef = null;
    this.editingDayData = null;
    this.editingReminder = null;

    this.reminderEditingService.reminderPopoverClosed$.next();
  }

  /**
   * Note that by using memoizee decorator we will just execute this function only when the
   * actual datasource parameter is changed.
   */
  @memoizee()
  groupDataSource(dataSource: DayData[]) {
    const ds = Object.assign([], dataSource);
    const rowGroups = new Array(Math.ceil(ds.length / 7))
      .fill(null)
      .map((_) => ds.splice(0, 7));
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
