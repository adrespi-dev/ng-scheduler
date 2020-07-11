import { Component, OnInit } from "@angular/core";
import { CurrentDateService } from "src/app/scheduler/services/current-date.service";
import * as moment from "moment";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  constructor(public cdService: CurrentDateService) {}

  ngOnInit(): void {}

  handlePrevClick() {
    this.cdService.goToPreviousMonth();
  }

  handleNextClick() {
    this.cdService.goToNextMonth();
  }

  handleTodayClick() {
    this.cdService.setNewDate(moment());
  }
}
