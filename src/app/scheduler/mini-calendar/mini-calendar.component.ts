import { Component, OnInit, OnDestroy, ViewChild } from "@angular/core";
import { CurrentDateService } from "../services/current-date.service";
import { Subscription } from "rxjs";
import { MatCalendar } from "@angular/material/datepicker";

@Component({
  selector: "app-mini-calendar",
  templateUrl: "./mini-calendar.component.html",
  styleUrls: ["./mini-calendar.component.scss"],
})
export class MiniCalendarComponent implements OnInit, OnDestroy {
  @ViewChild(MatCalendar) miniCalendar: MatCalendar<Date>;
  currentDateSub: Subscription;
  activeDate = new Date();

  constructor(private cdService: CurrentDateService) {}

  ngOnInit(): void {
    this.currentDateSub = this.cdService.currentDate$.subscribe(
      (incomingDate) => {
        if (!incomingDate.isSame(this.activeDate, "month")) {
          this.miniCalendar._goToDateInView(incomingDate.toDate(), "month");
        }
        this.activeDate = incomingDate.toDate();
      }
    );
  }

  ngOnDestroy(): void {
    this.currentDateSub.unsubscribe();
  }

  onCalendarSelectedChange(newDate: Date) {
    this.cdService.setNewDate(newDate);
  }
}
