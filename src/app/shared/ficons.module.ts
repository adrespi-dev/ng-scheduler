import { FeatherModule } from "angular-feather";
import { NgModule } from "@angular/core";
import {
  Calendar,
  ArrowLeft,
  ArrowRight,
  ChevronDown,
  Clock,
  MapPin,
  Tag,
} from "angular-feather/icons";

const icons = {
  Calendar,
  ArrowLeft,
  ArrowRight,
  ChevronDown,
  Clock,
  MapPin,
  Tag,
};

@NgModule({
  imports: [FeatherModule.pick(icons)],
  exports: [FeatherModule],
})
export class FiconsModule {}
