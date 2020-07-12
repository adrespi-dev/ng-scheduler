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
  Github,
  Search,
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
  Github,
  Search,
};

@NgModule({
  imports: [FeatherModule.pick(icons)],
  exports: [FeatherModule],
})
export class FiconsModule {}
