import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatTableModule } from "@angular/material/table";
import { NeoUiModule } from "@nasa-open-apis/web/neo/neo-ui";
import { BrowseComponent } from "./pages/browse/browse.component";
import { NeoBrowseRoutingModule } from "./routes/neo-browse-routing.module";

@NgModule({
  imports: [
    CommonModule,
    NeoBrowseRoutingModule,
    NeoUiModule,
    MatTableModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatButtonModule,
  ],
  declarations: [BrowseComponent],
  exports: [BrowseComponent],
})
export class NeoBrowseFeatureModule {}
