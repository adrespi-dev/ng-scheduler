import { Injectable } from "@angular/core";
import * as moment from "moment";
import { BehaviorSubject, Observable } from "rxjs";

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
    console.log("new date is", date.format());
    this._currentDate$.next(date);
  }
}
