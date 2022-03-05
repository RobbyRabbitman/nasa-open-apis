import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { NeoUiModule } from "@nasa-open-apis/web/neo/neo-ui";
import { NeoComponent } from "./pages/neo/neo.component";
import { NeoRoutingModule } from "./routes/neo-browse-routing.module";

@NgModule({
  imports: [
    CommonModule,
    NeoRoutingModule,
    NeoUiModule,
    MatListModule,
    MatCardModule,
    MatIconModule,
  ],
  declarations: [NeoComponent],
})
export class NeoFeatureModule {}
