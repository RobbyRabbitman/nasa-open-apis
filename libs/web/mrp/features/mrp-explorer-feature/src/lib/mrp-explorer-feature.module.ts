import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MrpUiModule } from "@nasa-open-apis/web/mrp/mrp-ui";
import { ExplorerComponent } from "./pages/explorer/explorer.component";
import { RoversComponent } from "./pages/rovers/rovers.component";
import { MrpExplorerRoutingModule } from "./routes/mrp-explorer-routing.module";

@NgModule({
  declarations: [ExplorerComponent, RoversComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MrpUiModule,
    MrpExplorerRoutingModule,
    ReactiveFormsModule,
  ],
})
export class MrpExplorerFeatureModule {}
