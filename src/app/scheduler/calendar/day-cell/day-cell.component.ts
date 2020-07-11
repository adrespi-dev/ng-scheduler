import { Component, OnInit, Input } from "@angular/core";
import DayData from "../../models/day-data";
import memoizee from "src/app/shared/utils/memoizee-decorator";

@Component({
  selector: "[app-day-cell]",
  templateUrl: "./day-cell.component.html",
  styleUrls: ["./day-cell.component.scss"],
})
export class DayCellComponent implements OnInit {
  @Input() dayData: DayData;

  constructor() {}

  ngOnInit(): void {}

  @memoizee()
  getDay(date: Date) {
    return date.getDate();
  }
}
