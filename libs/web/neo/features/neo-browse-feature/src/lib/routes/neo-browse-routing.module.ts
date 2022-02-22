import { NgModule } from "@angular/core";
import { Route, RouterModule } from "@angular/router";
import { BrowseComponent } from "../pages/browse/browse.component";
import { BROWSE_PAGE } from "./routes";

export const ROUTES: Route[] = [
  { path: BROWSE_PAGE, component: BrowseComponent },
  { path: "**", redirectTo: BROWSE_PAGE, pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule],
})
export class NeoBrowseRoutingModule {}
