import { Component, OnInit, Input } from "@angular/core";
import { FormControl, Validators, FormGroup } from "@angular/forms";
import { Observable } from "rxjs";
import { startWith, map } from "rxjs/operators";
import * as moment from "moment";
import DEFAULT_COLORS from "../data/colors";
import { MatOption } from "@angular/material/core";

@Component({
  selector: "app-reminder-editor",
  templateUrl: "./reminder-editor.component.html",
  styleUrls: ["./reminder-editor.component.scss"],
})
export class ReminderEditorComponent implements OnInit {
  @Input() initialDate: Date;

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

  constructor() {
    const startOfDay = moment().startOf("day");
    const endDate = startOfDay.clone().add(1, "days");

    while (startOfDay < endDate) {
      this.timeOptions.push(startOfDay.format("HH:mm"));
      startOfDay.add(15, "minutes");
    }
  }

  ngOnInit(): void {
    if (this.initialDate) {
      this.date.setValue(this.initialDate);
      // this.date.disable();
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
}
