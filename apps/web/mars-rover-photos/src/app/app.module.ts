import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule } from "@angular/router";
import { ApiRateLimitDataModule } from "@nasa-open-apis/web/api-rate-limit/api-rate-limit-data";
import { MrpDataModule } from "@nasa-open-apis/web/mrp/mrp-data";
import { NgxsLoggerPluginModule } from "@ngxs/logger-plugin";
import { NgxsModule } from "@ngxs/store";
import { environment } from "../environments/environment";
import { AppComponent } from "./app.component";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    // features
    RouterModule.forRoot([
      {
        path: "",
        loadChildren: () =>
          import("@nasa-open-apis/web/mrp/features/mrp-explorer-feature").then(
            (module) => module.MrpExplorerFeatureModule
          ),
      },
      { path: "**", redirectTo: "", pathMatch: "full" },
    ]),
    // ngxs
    NgxsModule.forRoot([], { developmentMode: !environment.production }),
    MrpDataModule.init(environment.api),
    ApiRateLimitDataModule.init(environment.api),
    NgxsLoggerPluginModule.forRoot({ disabled: environment.production }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
