import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { CitiesService } from "../services/cities.service";
import { RemindersFilteringService } from "../services/reminders-filtering.service";

@Component({
  selector: "app-cities-filter",
  templateUrl: "./cities-filter.component.html",
  styleUrls: ["./cities-filter.component.scss"],
})
export class CitiesFilterComponent implements OnInit, OnDestroy {
  selectedCities: string[] = [];
  cities: string[] = null;
  citiesSub: Subscription;

  constructor(
    private citiesService: CitiesService,
    private remindersFiltering: RemindersFilteringService
  ) {}

  ngOnInit(): void {
    this.citiesSub = this.citiesService.cities$.subscribe((incomingCities) => {
      if (!this.cities) {
        this.selectedCities = incomingCities.map((c) => c);
      } else {
        // check new cities
        const newCities = incomingCities
          .filter((c) => !this.cities.find((d) => d == c))
          .map((c) => c);
        this.selectedCities = this.selectedCities.concat(newCities);
        this.handleSelectionChanged();
      }
      this.cities = incomingCities;
    });
  }

  ngOnDestroy(): void {
    this.citiesSub.unsubscribe();
  }

  handleSelectionChanged() {
    this.remindersFiltering.setNewCities(this.selectedCities);
  }

  isIndeterminate(): boolean {
    return (
      this.selectedCities &&
      this.cities.length &&
      this.selectedCities.length > 0 &&
      this.selectedCities.length < this.cities.length
    );
  }

  isChecked(): boolean {
    return (
      this.selectedCities &&
      this.cities.length &&
      this.selectedCities.length === this.cities.length
    );
  }

  toggleSelectAll(checked: boolean) {
    if (checked) {
      this.selectedCities = this.cities.map((c) => c);
    } else {
      this.selectedCities = [];
    }
    this.handleSelectionChanged();
  }
}
