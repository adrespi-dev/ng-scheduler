import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, combineLatest } from "rxjs";
import { RemindersService } from "./reminders.service";
import { map } from "rxjs/operators";
import Reminder from "../models/reminder";

interface ReminderFilter {
  colors: string[];
  cities: string[];
}

@Injectable({
  providedIn: "root",
})
export class RemindersFilteringService {
  private _filter$ = new BehaviorSubject<ReminderFilter>({
    colors: null,
    cities: null,
  });

  constructor(private remindersService: RemindersService) {}

  get filteredReminders$(): Observable<Reminder[]> {
    return combineLatest([
      this._filter$,
      this.remindersService.reminders$,
    ]).pipe(
      map(([filter, reminders]) => {
        let filtered = reminders;
        if (filter.colors) {
          filtered = reminders.filter((r) => filter.colors.includes(r.color));
        }

        if (filter.cities) {
          filtered = reminders.filter((r) => filter.cities.includes(r.city));
        }

        return filtered;
      })
    );
  }

  setNewColors(colors: string[]) {
    const newFilter = { ...this._filter$.value };
    newFilter.colors = colors;
    this._filter$.next(newFilter);
  }

  setNewCities(cities: string[]) {
    const newFilter = { ...this._filter$.value };
    newFilter.cities = cities;
    this._filter$.next(newFilter);
  }
}
