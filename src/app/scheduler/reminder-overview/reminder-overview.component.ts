import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import Reminder from "../models/reminder";
import DayData from "../models/day-data";

@Component({
  selector: "app-reminder-overview",
  templateUrl: "./reminder-overview.component.html",
  styleUrls: ["./reminder-overview.component.scss"],
})
export class ReminderOverviewComponent implements OnInit {
  @Input() dayData: DayData;
  @Input() reminder: Reminder;

  @Output() closePopover = new EventEmitter();

  showForm: boolean;

  initialDate: Date;
  isNewReminder = false;

  constructor() {}

  ngOnInit(): void {
    this.isNewReminder = this.dayData != null;
    if (this.isNewReminder) {
      this.initialDate = this.dayData.dateTime;
      this.showForm = true;
    }
  }

  handleDeleteReminder() {}
}
