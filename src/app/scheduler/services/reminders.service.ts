import { Injectable, NgZone } from "@angular/core";
import { Observable, BehaviorSubject, Subject } from "rxjs";
import * as moment from "moment";
import Reminder from "../models/reminder";
import { WeatherForecastService } from "./weather-forecast.service";
import getSeedData from "./reminders-seeder";

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

  constructor(public foreCastService: WeatherForecastService) {
    this.setNewRemindersList(getSeedData());
  }

  get reminders(): Reminder[] {
    return this._reminders$.value;
  }

  get reminders$(): Observable<Reminder[]> {
    return this._reminders$.asObservable();
  }

  setNewRemindersList(newList: Reminder[]) {
    this._reminders$.next(
      newList.sort((a, b) => {
        const sortingByDate =
          b.dateTime.milliseconds() - a.dateTime.milliseconds();
        const sortingById = b.id - a.id;
        return sortingByDate || sortingById;
      })
    );
  }

  createNewReminder(reminder: ReminderDTO): Observable<boolean> {
    for (const key in reminder) {
      if (!reminder[key]) {
        throw new Error(`arg ${key} must not be empty`);
      }
    }

    return this.addReminder$(reminder);
  }

  updateReminder(
    reminderId: number,
    reminder: ReminderDTO
  ): Observable<boolean> {
    for (const key in reminder) {
      if (!reminder[key]) {
        throw new Error(`arg ${key} must not be empty`);
      }
    }

    return this.updateReminder$(reminderId, reminder);
  }

  deleteReminders(remindersIds: number[]): Observable<boolean> {
    return this.deleteReminders$(remindersIds);
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
        this.setNewRemindersList(newReminderList);

        subscriber.next(true);
        subscriber.complete();
      }, 250); // adding some delay to simulate an external api call
    });
  }

  private updateReminder$(reminderId: number, dto: ReminderDTO) {
    return new Observable<boolean>((subscriber) => {
      setTimeout(() => {
        const dateTimeStr =
          moment(dto.date).format("YYYY-MM-DD") + " " + dto.time;
        const dateTime = moment(dateTimeStr, "YYYY-MM-DD HH:mm");

        const remintedToUpdate = this.reminders.find((r) => r.id == reminderId);
        remintedToUpdate.updateData(dto.title, dateTime, dto.city, dto.color);

        const newReminderList = this.reminders.slice();
        this.setNewRemindersList(newReminderList);

        subscriber.next(true);
        subscriber.complete();
      }, 250); // adding some delay to simulate an external api call
    });
  }

  private deleteReminders$(remindersIds: number[]) {
    return new Observable<boolean>((subscriber) => {
      setTimeout(() => {
        const newReminderList = this.reminders.filter(
          (r) => !remindersIds.includes(r.id)
        );
        this.setNewRemindersList(newReminderList);

        subscriber.next(true);
        subscriber.complete();
      }, 250); // adding some delay to simulate an external api call
    });
  }
}
