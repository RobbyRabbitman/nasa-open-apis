import { NgModule } from "@angular/core";
import { Route, RouterModule } from "@angular/router";
import { ExplorerComponent } from "../pages/explorer/explorer.component";
import { RoversComponent } from "../pages/rovers/rovers.component";
import { EXPLORER_PAGE, ROVERS_PAGE } from "./routes";

export const ROUTES: Route[] = [
  { path: ROVERS_PAGE, component: RoversComponent },
  { path: EXPLORER_PAGE, component: ExplorerComponent },
  { path: "**", redirectTo: ROVERS_PAGE, pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule],
})
export class MrpExplorerRoutingModule {}
