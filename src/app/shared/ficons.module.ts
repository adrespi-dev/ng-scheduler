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
  Edit2,
  Trash,
  X,
} from "angular-feather/icons";

const icons = {
  Calendar,
  ArrowLeft,
  ArrowRight,
  ChevronDown,
  Clock,
  MapPin,
  Tag,
  Edit2,
  Trash,
  X,
};

@NgModule({
  imports: [FeatherModule.pick(icons)],
  exports: [FeatherModule],
})
export class FiconsModule {}
