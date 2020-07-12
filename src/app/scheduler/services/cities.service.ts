import { Injectable } from "@angular/core";
import { RemindersService } from "./reminders.service";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class CitiesService {
  constructor(private remindersService: RemindersService) {}

  get cities$(): Observable<string[]> {
    return this.remindersService.reminders$.pipe(
      map((reminders) => {
        const cities: string[] = reminders
          .map((r) => r.city)
          .filter((value, index, self) => self.indexOf(value) === index);
        return cities.sort((a, b) => a.localeCompare(b));
      })
    );
  }
}
