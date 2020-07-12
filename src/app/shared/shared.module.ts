import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MaterialModule } from "./material.module";
import { FiconsModule } from "./ficons.module";
import { SatPopoverModule } from "@ncstate/sat-popover";
import { ColorPickerModule } from "ngx-color-picker";
import { LoadingOverlayComponent } from "./components/loading-overlay/loading-overlay.component";

@NgModule({
  declarations: [LoadingOverlayComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FiconsModule,
    SatPopoverModule,
    ColorPickerModule,
  ],
  exports: [
    MaterialModule,
    FiconsModule,
    SatPopoverModule,
    ColorPickerModule,
    LoadingOverlayComponent,
  ],
})
export class SharedModule {}
