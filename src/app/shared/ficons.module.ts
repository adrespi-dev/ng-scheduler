import { FeatherModule } from "angular-feather";
import { NgModule } from "@angular/core";
import { Calendar, ArrowLeft, ArrowRight } from "angular-feather/icons";

const icons = {
  Calendar,
  ArrowLeft,
  ArrowRight,
};

@NgModule({
  imports: [FeatherModule.pick(icons)],
  exports: [FeatherModule],
})
export class FiconsModule {}
