import { NgModule } from "@angular/core";
import { Route, RouterModule } from "@angular/router";
import { NeoComponent } from "../pages/neo/neo.component";
import { NEO_PAGE } from "./routes";

export const ROUTES: Route[] = [
  { path: NEO_PAGE, component: NeoComponent },
  { path: "**", redirectTo: NEO_PAGE, pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule],
})
export class NeoRoutingModule {}
