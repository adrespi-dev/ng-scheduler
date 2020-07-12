import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  OnDestroy,
} from "@angular/core";
import DayData from "../../models/day-data";
import memoizee from "src/app/shared/utils/memoizee-decorator";
import { ReminderEditingService } from "../../services/reminder-editing.service";
import { Subscription } from "rxjs";

@Component({
  selector: "[app-day-cell]",
  templateUrl: "./day-cell.component.html",
  styleUrls: ["./day-cell.component.scss"],
})
export class DayCellComponent implements OnInit, OnDestroy {
  @Input() dayData: DayData;
  @Input() isEditing: boolean = false;
  @ViewChild("newReminder") newReminder: any;
  newReminderFormSub: Subscription;

  constructor(private reminderEditingService: ReminderEditingService) {}

  ngOnInit(): void {
    this.newReminderFormSub = this.reminderEditingService.newReminderFormChanged$.subscribe(
      (newReminderSnapshop) => {
        console.log(newReminderSnapshop);
      }
    );
  }

  ngOnDestroy(): void {
    this.newReminderFormSub.unsubscribe();
  }

  handleCellClick() {
    this.reminderEditingService.openNewReminder(this.newReminder, this.dayData);
  }

  @memoizee()
  getDay(date: Date) {
    if (!date) return null;

    return date.getDate();
  }
}
