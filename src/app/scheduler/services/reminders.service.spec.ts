import { TestBed } from "@angular/core/testing";
import { async } from "@angular/core/testing";

import { RemindersService, ReminderDTO } from "./reminders.service";
import { Observable } from "rxjs";

describe("RemindersService", () => {
  let service: RemindersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RemindersService);
  });

  const getDefaultReminder = (): ReminderDTO => {
    return {
      title: "Test Reminder",
      date: new Date(),
      time: "13:30",
      city: "Test city",
      color: "#0052cc",
    };
  };

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("should throw error if a required prop is empty", () => {
    const requiredProps = ["title", "date", "time", "city", "color"];
    requiredProps.forEach((prop) => {
      const reminder = getDefaultReminder();
      reminder[prop] = null;

      expect(() => service.createNewReminder(reminder)).toThrowError(
        `arg ${prop} must not be empty`
      );
    });
  });

  it("should return an observable", () => {
    const reminder = getDefaultReminder();
    expect(service.createNewReminder(reminder)).toBeInstanceOf(Observable);
  });

  it("should create the reminder once the observable is done", (done) => {
    const reminder = getDefaultReminder();

    reminder.date = new Date(2020, 0, 1);
    reminder.time = "14:30";

    service.createNewReminder(reminder).subscribe((_) => {
      const reminders = service.reminders;
      expect(reminders.length).toBe(1);

      const createdReminder = reminders[0];
      expect(createdReminder.id).toBeTruthy();
      expect(createdReminder.title).toBe(reminder.title);
      expect(createdReminder.dateTime.format("YYYY-MM-DD HH:mm")).toBe(
        "2020-01-01 14:30"
      );
      expect(createdReminder.city).toBe(reminder.city);
      expect(createdReminder.color).toBe(reminder.color);

      done();
    });
  });
});
