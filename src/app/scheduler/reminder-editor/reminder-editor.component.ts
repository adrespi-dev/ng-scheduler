import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { FormControl, Validators, FormGroup } from "@angular/forms";
import { Observable } from "rxjs";
import { startWith, map, finalize } from "rxjs/operators";
import * as moment from "moment";
import DEFAULT_COLORS from "../data/colors";
import { MatOption } from "@angular/material/core";
import { RemindersService, ReminderDTO } from "../services/reminders.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import DayData from "../models/day-data";
import Reminder from "../models/reminder";

@Component({
  selector: "app-reminder-editor",
  templateUrl: "./reminder-editor.component.html",
  styleUrls: ["./reminder-editor.component.scss"],
})
export class ReminderEditorComponent implements OnInit {
  @Input() isNewReminder: boolean;
  @Input() initialDate: Date;
  @Input() reminderToUpdate: Reminder;

  @Output() closePopover = new EventEmitter();

  isLoading = false;

  timeOptions: string[] = [];
  filteredTimeOptions: Observable<string[]>;

  defaultColors = DEFAULT_COLORS;
  useCustomColor = false;

  title = new FormControl("", [Validators.required, Validators.maxLength(30)]);
  date = new FormControl(null, [Validators.required]);
  time = new FormControl(null, [
    Validators.required,
    Validators.pattern(/^(2[0-3]|[0-1]?[\d]):[0-5][\d]$/),
  ]);
  city = new FormControl(null, [Validators.required]);
  color = new FormControl(this.defaultColors[0].value, [Validators.required]);

  reminderForm = new FormGroup({
    title: this.title,
    date: this.date,
    time: this.time,
    city: this.city,
    color: this.color,
  });

  constructor(
    private reminderService: RemindersService,
    private snackBar: MatSnackBar
  ) {
    const startOfDay = moment().startOf("day");
    const endDate = startOfDay.clone().add(1, "days");

    while (startOfDay < endDate) {
      this.timeOptions.push(startOfDay.format("HH:mm"));
      startOfDay.add(15, "minutes");
    }
  }

  ngOnInit(): void {
    if (this.isNewReminder) {
      if (this.initialDate) {
        this.date.setValue(this.initialDate);
      }
    } else if (this.reminderToUpdate) {
      const dateTime = this.reminderToUpdate.dateTime;
      const reminderDto: ReminderDTO = {
        title: this.reminderToUpdate.title,
        date: dateTime.clone().startOf("day").toDate(),
        time: dateTime.clone().format("HH:mm"),
        city: this.reminderToUpdate.city,
        color: this.reminderToUpdate.color,
      };
      this.reminderForm.setValue(reminderDto);
    }

    this.filteredTimeOptions = this.time.valueChanges.pipe(
      startWith(""),
      map((value) => this._filter(value))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.timeOptions.filter(
      (option) => option.toLowerCase().indexOf(filterValue) === 0
    );
  }

  onColorCheckboxChanged(checked: boolean) {
    this.useCustomColor = checked;
    if (!checked) {
      this.color.setValue(this.defaultColors[0].value);
    }
  }

  onColorChanged(newColor: string) {
    this.color.setValue(newColor);
  }

  onSubmit() {
    this.isLoading = true;

    if (this.isNewReminder) {
      this.createReminder();
    } else {
      this.updateReminder();
    }
  }

  createReminder() {
    this.reminderService
      .createNewReminder(this.reminderForm.value)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe((_) => {
        this.snackBar.open("Reminder created successfully", "Ok", {
          duration: 2000,
        });
        this.closePopover.emit();
      });
  }

  updateReminder() {
    this.reminderService
      .updateReminder(this.reminderToUpdate.id, this.reminderForm.value)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe((_) => {
        this.snackBar.open("Reminder update successfully", "Ok", {
          duration: 2000,
        });
        this.closePopover.emit();
      });
  }
}
