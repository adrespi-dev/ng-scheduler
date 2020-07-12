import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import DayData from "../../models/day-data";

@Component({
  selector: "app-day-overflow",
  templateUrl: "./day-overflow.component.html",
  styleUrls: ["./day-overflow.component.scss"],
})
export class DayOverflowComponent implements OnInit {
  @Input() dayData: DayData;
  @Output() closePopover = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}
}
