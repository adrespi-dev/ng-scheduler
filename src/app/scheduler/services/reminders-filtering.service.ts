import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, combineLatest } from "rxjs";
import { RemindersService } from "./reminders.service";
import { map } from "rxjs/operators";
import Reminder from "../models/reminder";

interface ReminderFilter {
  searchTerm: string;
  colors: string[];
  cities: string[];
}

@Injectable({
  providedIn: "root",
})
export class RemindersFilteringService {
  private _filter$ = new BehaviorSubject<ReminderFilter>({
    searchTerm: null,
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
          filtered = filtered.filter((r) => filter.colors.includes(r.color));
        }

        if (filter.cities) {
          filtered = filtered.filter((r) => filter.cities.includes(r.city));
        }

        if (filter.searchTerm) {
          const search = filter.searchTerm.toLowerCase();
          filtered = filtered.filter((r) => {
            const title = r.title.toLowerCase();
            const city = r.city.toLowerCase();
            return title.includes(search) || city.includes(search);
          });
        }

        return filtered;
      })
    );
  }

  setNewSearchTerm(searchTerm: string) {
    const newFilter = { ...this._filter$.value };
    newFilter.searchTerm = searchTerm;
    this._filter$.next(newFilter);
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
