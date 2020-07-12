import { Component, OnInit, OnDestroy } from "@angular/core";
import { ColorsService } from "../services/colors.service";
import Color from "../models/color";
import { Subscription } from "rxjs";
import { RemindersFilteringService } from "../services/reminders-filtering.service";
import { MatListOption } from "@angular/material/list";
import { MatCheckboxChange } from "@angular/material/checkbox";

@Component({
  selector: "app-colors-filter",
  templateUrl: "./colors-filter.component.html",
  styleUrls: ["./colors-filter.component.scss"],
})
export class ColorsFilterComponent implements OnInit, OnDestroy {
  selectedColors: string[] = [];
  colors: Color[] = null;
  colorsSub: Subscription;

  constructor(
    private colorsService: ColorsService,
    private remindersFiltering: RemindersFilteringService
  ) {}

  ngOnInit(): void {
    this.colorsSub = this.colorsService.colors$.subscribe((incomingColors) => {
      if (!this.colors) {
        this.selectedColors = incomingColors.map((c) => c.value);
      } else {
        // check new colors
        const newColors = incomingColors
          .filter((c) => !this.colors.find((d) => d.value == c.value))
          .map((c) => c.value);
        this.selectedColors = this.selectedColors.concat(newColors);
        this.handleSelectionChanged();
      }
      this.colors = incomingColors;
    });
  }

  ngOnDestroy(): void {
    this.colorsSub.unsubscribe();
  }

  handleSelectionChanged() {
    this.remindersFiltering.setNewColors(this.selectedColors);
  }

  isIndeterminate(): boolean {
    return (
      this.selectedColors &&
      this.colors.length &&
      this.selectedColors.length > 0 &&
      this.selectedColors.length < this.colors.length
    );
  }

  isChecked(): boolean {
    return (
      this.selectedColors &&
      this.colors.length &&
      this.selectedColors.length === this.colors.length
    );
  }

  toggleSelectAll(checked: boolean) {
    if (checked) {
      this.selectedColors = this.colors.map((c) => c.value);
    } else {
      this.selectedColors = [];
    }
    this.handleSelectionChanged();
  }
}
