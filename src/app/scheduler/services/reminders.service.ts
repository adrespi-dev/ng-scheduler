import { Injectable, NgZone } from "@angular/core";
import { Observable, BehaviorSubject, Subject } from "rxjs";
import * as moment from "moment";
import Reminder from "../models/reminder";
import { WeatherForecastService } from "./weather-forecast.service";

export type ReminderDTO = {
  title: string;
  date: Date;
  time: string;
  city: string;
  color: string;
};

@Injectable({
  providedIn: "root",
})
export class RemindersService {
  private _reminders$ = new BehaviorSubject<Reminder[]>([]);

  constructor(
    private ngZone: NgZone,
    public foreCastService: WeatherForecastService
  ) {
    this.createNewReminder({
      title: "Testing a really long text, because should wrapper",
      city: "London",
      color: "#0052cc",
      date: moment(new Date()).add(-1, "days").toDate(),
      time: "11:10",
    }).subscribe();
    (window as any).create = () => {
      this.ngZone.run(() => {
        this.createNewReminder({
          title: "Testing a really long text, because should wrapper",
          city: "London",
          color: "#0052cc",
          date: new Date(),
          time: "11:10",
        }).subscribe();
      });
    };
  }

  get reminders(): Reminder[] {
    return this._reminders$.value;
  }

  get reminders$(): Observable<Reminder[]> {
    return this._reminders$.asObservable();
  }

  createNewReminder(reminder: ReminderDTO): Observable<boolean> {
    for (const key in reminder) {
      if (!reminder[key]) {
        throw new Error(`arg ${key} must not be empty`);
      }
    }

    return this.addReminder$(reminder);
  }

  private addReminder$(dto: ReminderDTO) {
    return new Observable<boolean>((subscriber) => {
      setTimeout(() => {
        const dateTimeStr =
          moment(dto.date).format("YYYY-MM-DD") + " " + dto.time;
        const dateTime = moment(dateTimeStr, "YYYY-MM-DD HH:mm");

        const newReminder = new Reminder(
          dto.title,
          dateTime,
          dto.city,
          dto.color
        );

        const newReminderList = this._reminders$.value.concat([newReminder]);
        this._reminders$.next(
          newReminderList.sort((a, b) =>
            b.dateTime.isBefore(a.dateTime) ? 0 : -1
          )
        );

        subscriber.next(true);
        subscriber.complete();
      }, 250); // adding some delay to simulate an external api call
    });
  }
}
