import { Injectable } from "@angular/core";
import * as moment from "moment";
import { BehaviorSubject, Observable } from "rxjs";
import { map, distinctUntilChanged } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class CurrentDateService {
  private _currentDate$ = new BehaviorSubject<moment.Moment>(moment());

  constructor() {}

  get currentDate(): moment.Moment {
    return this._currentDate$.value.clone();
  }

  get currentDate$(): Observable<moment.Moment> {
    return this._currentDate$.asObservable();
  }

  get currentMonth$(): Observable<moment.Moment> {
    return this._currentDate$.asObservable().pipe(
      map((date) => {
        return date.startOf("month");
      }),
      distinctUntilChanged((a, b) => a.isSame(b, "month"))
    );
  }

  goToPreviousMonth() {
    const newDate = this.currentDate.add(-1, "months");
    this.setNewDate(newDate);
  }

  goToNextMonth() {
    const newDate = this.currentDate.add(1, "months");
    this.setNewDate(newDate);
  }

  setNewDate(value: moment.Moment | Date) {
    let date: moment.Moment;
    if (value instanceof Date) {
      date = moment(value);
    } else {
      date = value;
    }
    this._currentDate$.next(date);
    // if (!this._currentDate$.value.isSame(date, "month")) {
    // }
  }
}
