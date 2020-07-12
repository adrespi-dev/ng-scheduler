import { TestBed } from "@angular/core/testing";
import { async } from "@angular/core/testing";

import { RemindersService, ReminderDTO } from "./reminders.service";
import { Observable } from "rxjs";
import { HttpClientTestingModule } from "@angular/common/http/testing";

describe("RemindersService", () => {
  let service: RemindersService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
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

  describe("createNewReminder()", () => {
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

    it("should create the reminder correctly", (done) => {
      const reminder = getDefaultReminder();

      reminder.date = new Date(2020, 0, 1);
      reminder.time = "14:30";

      const currentCount = service.reminders.length;

      service.createNewReminder(reminder).subscribe((_) => {
        const reminders = service.reminders;
        expect(reminders.length).toBe(currentCount + 1);

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

    it("should start weather info loading after create", (done) => {
      const reminder = getDefaultReminder();

      service.createNewReminder(reminder).subscribe((_) => {
        const reminders = service.reminders;

        const createdReminder = reminders[0];
        expect(createdReminder.isLoadingForecast).toBe(true);

        done();
      });
    });
  });

  describe("updateReminder()", () => {
    it("should throw error if a required prop is empty", () => {
      const requiredProps = ["title", "date", "time", "city", "color"];
      const reminderToUpdate = service.reminders[0];

      requiredProps.forEach((prop) => {
        const changes = getDefaultReminder();
        changes[prop] = null;

        expect(() =>
          service.updateReminder(reminderToUpdate.id, changes)
        ).toThrowError(`arg ${prop} must not be empty`);
      });
    });

    it("should return an observable", () => {
      const reminderToUpdate = service.reminders[0];
      const changes = getDefaultReminder();

      expect(
        service.updateReminder(reminderToUpdate.id, changes)
      ).toBeInstanceOf(Observable);
    });

    it("should update the reminder correctly", (done) => {
      const reminderToUpdate = service.reminders[0];
      const changes: ReminderDTO = {
        title: "New Title",
        date: new Date(2020, 0, 1),
        time: "14:30",
        city: "Quito",
        color: "#ffffff",
      };
      const currentCount = service.reminders.length;

      service.updateReminder(reminderToUpdate.id, changes).subscribe((_) => {
        const reminders = service.reminders;
        expect(reminders.length).toBe(currentCount);

        const reminderUpdated = reminders.find(
          (r) => r.id == reminderToUpdate.id
        );
        expect(reminderUpdated.id).toBeTruthy();
        expect(reminderUpdated.title).toBe(changes.title);
        expect(reminderUpdated.dateTime.format("YYYY-MM-DD HH:mm")).toBe(
          "2020-01-01 14:30"
        );
        expect(reminderUpdated.city).toBe(changes.city);
        expect(reminderUpdated.color).toBe(changes.color);

        done();
      });
    });

    it("should start weather info loading after update", (done) => {
      const reminderToUpdate = service.reminders[0];
      const changes = getDefaultReminder();

      service.updateReminder(reminderToUpdate.id, changes).subscribe((_) => {
        const reminders = service.reminders;

        const createdReminder = reminders[0];
        expect(createdReminder.isLoadingForecast).toBe(true);

        done();
      });
    });
  });
});
