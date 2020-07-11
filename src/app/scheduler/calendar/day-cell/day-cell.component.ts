import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
} from "@angular/core";
import DayData from "../../models/day-data";
import memoizee from "src/app/shared/utils/memoizee-decorator";

@Component({
  selector: "[app-day-cell]",
  templateUrl: "./day-cell.component.html",
  styleUrls: ["./day-cell.component.scss"],
})
export class DayCellComponent implements OnInit {
  @Input() dayData: DayData;
  @Input() isEditing: boolean = false;
  @Output() cellClick = new EventEmitter<any>();
  @ViewChild("newReminder") newReminder: any;

  constructor() {}

  ngOnInit(): void {}

  handleCellClick() {
    this.cellClick.next(this.newReminder);
  }

  @memoizee()
  getDay(date: Date) {
    return date.getDate();
  }
}
