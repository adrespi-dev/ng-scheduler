import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import Reminder from "../models/reminder";
import DayData from "../models/day-data";
import { RemindersService } from "../services/reminders.service";
import { MatSnackBar } from "@angular/material/snack-bar";

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

  constructor(
    private remindersService: RemindersService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.isNewReminder = this.dayData != null;
    if (this.isNewReminder) {
      this.initialDate = this.dayData.dateTime;
      this.showForm = true;
    }
  }

  handleDeleteReminder() {
    const _confirm = confirm("Are you sure you want to delete this reminder?");
    if (!_confirm) return;

    this.remindersService.deleteReminders([this.reminder.id]).subscribe((_) => {
      this.snackBar.open("Reminder deleted successfully", "Ok", {
        duration: 2000,
      });
      this.closePopover.emit();
    });
  }
}
