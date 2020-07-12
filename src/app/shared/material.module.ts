import { NgModule } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from "@angular/material/core";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatSelectModule } from "@angular/material/select";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatTooltipModule } from "@angular/material/tooltip";

@NgModule({
  imports: [
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
  ],
  exports: [
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
  ],
})
export class MaterialModule {}
