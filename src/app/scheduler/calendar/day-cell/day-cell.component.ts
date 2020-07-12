import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  OnDestroy,
  ElementRef,
  AfterViewChecked,
  HostListener,
  AfterContentChecked,
} from "@angular/core";
import DayData from "../../models/day-data";
import memoizee from "src/app/shared/utils/memoizee-decorator";
import { ReminderEditingService } from "../../services/reminder-editing.service";
import { Subscription } from "rxjs";
import { ChangeDetectorRef } from "@angular/core";
import { SatPopover } from "@ncstate/sat-popover";
import { RemindersService } from "../../services/reminders.service";
import { MatSnackBar } from "@angular/material/snack-bar";

const REMINDER_ITEM_HEIGHT = 30;

@Component({
  selector: "[app-day-cell]",
  templateUrl: "./day-cell.component.html",
  styleUrls: ["./day-cell.component.scss"],
})
export class DayCellComponent implements OnInit, OnDestroy, AfterViewChecked {
  @Input() dayData: DayData;
  @Input() isEditing: boolean = false;
  @ViewChild("newReminder") newReminder: any;
  @ViewChild("dayCell") dayCellEl: ElementRef;
  @ViewChild("dayBody") dayBodyEl: ElementRef;
  @ViewChild("popoverOverFlow") popoverOverFlow: SatPopover;
  @ViewChild("dayBodyContent") dayBodyContentEl: ElementRef;

  fixedHeigh: number;
  hiddenItemsByOverflow: number = 0;

  constructor(
    private remindersService: RemindersService,
    private reminderEditingService: ReminderEditingService,
    private cdRef: ChangeDetectorRef,
    private snackBar: MatSnackBar
  ) {}

  ngAfterViewChecked(): void {
    this.calculateCellBodyHeight();
    this.cdRef.detectChanges();
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {}

  handleCellClick() {
    this.reminderEditingService.openNewReminder(this.newReminder, this.dayData);
  }

  handleShowMoreClick(e: any) {
    e.stopPropagation();
    this.popoverOverFlow.open();
  }

  calculateCellBodyHeight() {
    const maxHeightAllowed = this.dayCellEl.nativeElement.clientHeight - 29;
    const contentHeight = this.dayBodyContentEl.nativeElement.clientHeight + 4; // add the padding pxs
    const modResult = maxHeightAllowed % REMINDER_ITEM_HEIGHT;
    let fixedHeigh = maxHeightAllowed - modResult; // add 4px for the paddings

    if (fixedHeigh < contentHeight) {
      // there's overflow so leave space for the 'Show More' button
      this.hiddenItemsByOverflow =
        (contentHeight - fixedHeigh) / REMINDER_ITEM_HEIGHT + 1;
      fixedHeigh -= 30;
    } else {
      this.hiddenItemsByOverflow = 0;
    }

    this.fixedHeigh = fixedHeigh;
  }

  handleDeleteAllReminders(e: any) {
    e.stopPropagation();
    const _confirm = confirm(
      "Do you want to delete all the reminders on this day?"
    );
    if (!_confirm) return;

    const remindersIds = this.dayData.reminders.map((r) => r.id);
    this.remindersService.deleteReminders(remindersIds).subscribe((_) => {
      this.snackBar.open("Reminders deleted successfully", "Ok", {
        duration: 2000,
      });
    });
  }

  @memoizee()
  getDay(date: Date) {
    if (!date) return null;

    return date.getDate();
  }

  @HostListener("window:resize", ["$event"])
  onResize() {
    this.calculateCellBodyHeight();
  }
}
