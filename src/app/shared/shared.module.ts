import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MaterialModule } from "./material.module";
import { FiconsModule } from "./ficons.module";

@NgModule({
  declarations: [],
  imports: [CommonModule, MaterialModule, FiconsModule],
  exports: [MaterialModule, FiconsModule],
})
export class SharedModule {}
