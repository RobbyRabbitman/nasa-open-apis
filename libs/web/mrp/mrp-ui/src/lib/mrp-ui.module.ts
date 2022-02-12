import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { RoverCardComponent } from "./components/rover-card/rover-card.component";
@NgModule({
  imports: [CommonModule, MatCardModule, MatListModule, MatIconModule],
  declarations: [RoverCardComponent],
  exports: [RoverCardComponent],
})
export class MrpUiModule {}
