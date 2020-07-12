import { Injectable } from "@angular/core";
import { RemindersService } from "./reminders.service";
import { distinctUntilChanged, map } from "rxjs/operators";
import { Observable } from "rxjs";
import Color from "../models/color";
import DEFAULT_COLORS from "../data/colors";

@Injectable({
  providedIn: "root",
})
export class ColorsService {
  colorsMap: any = {};

  constructor(private remindersService: RemindersService) {
    DEFAULT_COLORS.forEach((color) => {
      this.colorsMap[color.value] = color.label;
    });
  }

  get colors$(): Observable<Color[]> {
    return this.remindersService.reminders$.pipe(
      map((reminders) => {
        const colorsOnReminders = reminders
          .map((r) => r.color)
          .filter((value, index, self) => self.indexOf(value) === index);

        const colors: any[] = colorsOnReminders.map((color) => {
          const friendlyName = this.colorsMap[color];
          const priority = friendlyName ? 1 : 0;
          return {
            label: friendlyName || color,
            value: color,
            priority: priority,
          };
        });
        return colors.sort(
          (a, b) => b.priority - a.priority || a.label.localeCompare(b.label)
        );
      })
    );
  }
}
