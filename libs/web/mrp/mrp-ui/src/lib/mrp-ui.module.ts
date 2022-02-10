import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RoverCardComponent } from "./components/rover-card/rover-card.component";

@NgModule({
  imports: [CommonModule],
  declarations: [RoverCardComponent],
  exports: [RoverCardComponent],
})
export class MrpUiModule {}
