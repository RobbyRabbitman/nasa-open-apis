import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { NeoComponent } from "./pages/neo/neo.component";
import { NeoRoutingModule } from "./routes/neo-browse-routing.module";

@NgModule({
  imports: [CommonModule, NeoRoutingModule],
  declarations: [NeoComponent],
})
export class NeoFeatureModule {}
