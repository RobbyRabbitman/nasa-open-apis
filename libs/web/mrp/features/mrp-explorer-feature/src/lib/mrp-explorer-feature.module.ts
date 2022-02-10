import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ExplorerComponent } from "./pages/explorer/explorer.component";
import { RoversComponent } from "./pages/rovers/rovers.component";
import { MrpExplorerRoutingModule } from "./routes/mrp-explorer-routing.module";

@NgModule({
  declarations: [ExplorerComponent, RoversComponent],
  imports: [CommonModule, MrpExplorerRoutingModule],
})
export class MrpExplorerFeatureModule {}
