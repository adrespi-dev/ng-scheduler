import { Component, OnInit } from "@angular/core";
import { CurrentDateService } from "src/app/scheduler/services/current-date.service";
import * as moment from "moment";
import { RemindersFilteringService } from "src/app/scheduler/services/reminders-filtering.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  searchBarFocused = false;
  searchTerm: string = null;

  constructor(
    public cdService: CurrentDateService,
    private filteringService: RemindersFilteringService
  ) {}

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

  clearSearchBar() {
    this.searchTerm = null;
    this.handleSearchTermChanged();
  }

  handleSearchTermChanged() {
    this.filteringService.setNewSearchTerm(this.searchTerm);
  }
}
