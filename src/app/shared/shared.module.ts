import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MaterialModule } from "./material.module";
import { FiconsModule } from "./ficons.module";
import { SatPopoverModule } from "@ncstate/sat-popover";
import { ColorPickerModule } from "ngx-color-picker";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MaterialModule,
    FiconsModule,
    SatPopoverModule,
    ColorPickerModule,
  ],
  exports: [MaterialModule, FiconsModule, SatPopoverModule, ColorPickerModule],
})
export class SharedModule {}
