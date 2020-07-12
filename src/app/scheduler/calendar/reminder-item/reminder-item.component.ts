import { Component, OnInit, Input, ViewChild, OnDestroy } from "@angular/core";
import Reminder from "../../models/reminder";
import { ReminderEditingService } from "../../services/reminder-editing.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-reminder-item",
  templateUrl: "./reminder-item.component.html",
  styleUrls: ["./reminder-item.component.scss"],
})
export class ReminderItemComponent implements OnInit, OnDestroy {
  isEditing = false;
  @Input() reminder: Reminder;
  @ViewChild("reminderWrapper") reminderWrapper: any;
  reminderPopoverClosedSub: Subscription;

  constructor(private reminderEditingService: ReminderEditingService) {}

  ngOnInit(): void {
    this.reminderPopoverClosedSub = this.reminderEditingService.reminderPopoverClosed$.subscribe(
      (_) => (this.isEditing = false)
    );
  }

  ngOnDestroy(): void {
    this.reminderPopoverClosedSub.unsubscribe();
  }

  handleClick(e: any) {
    e.stopPropagation();

    this.isEditing = true;
    this.reminderEditingService.openReminderEditor(
      this.reminderWrapper,
      this.reminder
    );
  }
}
