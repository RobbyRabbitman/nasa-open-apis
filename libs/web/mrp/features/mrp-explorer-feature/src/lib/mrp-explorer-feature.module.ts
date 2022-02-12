import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MrpUiModule } from "@nasa-open-apis/web/mrp/mrp-ui";
import { ExplorerComponent } from "./pages/explorer/explorer.component";
import { RoversComponent } from "./pages/rovers/rovers.component";
import { MrpExplorerRoutingModule } from "./routes/mrp-explorer-routing.module";
@NgModule({
  declarations: [ExplorerComponent, RoversComponent],
  imports: [CommonModule, MrpUiModule, MrpExplorerRoutingModule],
})
export class MrpExplorerFeatureModule {}
