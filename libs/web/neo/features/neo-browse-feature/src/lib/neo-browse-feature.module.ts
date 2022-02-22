import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatTableModule } from "@angular/material/table";
import { BrowseComponent } from "./pages/browse/browse.component";
import { NeoBrowseRoutingModule } from "./routes/neo-browse-routing.module";

@NgModule({
  imports: [
    CommonModule,
    NeoBrowseRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
  ],
  declarations: [BrowseComponent],
  exports: [BrowseComponent],
})
export class NeoBrowseFeatureModule {}
