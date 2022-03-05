import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { EstimatedDiameterComponent } from "./components/estimated-diameter/estimated-diameter.component";

@NgModule({
  imports: [CommonModule, MatIconModule],
  declarations: [EstimatedDiameterComponent],
  exports: [EstimatedDiameterComponent],
})
export class NeoUiModule {}
