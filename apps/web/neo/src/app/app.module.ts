import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { MatNativeDateModule } from "@angular/material/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule } from "@angular/router";
import { ApiRateLimitDataModule } from "@nasa-open-apis/web/api-rate-limit/api-rate-limit-data";
import { NeoDataModule } from "@nasa-open-apis/web/neo/neo-data";
import { ShellModule } from "@nasa-open-apis/web/shared/ui/shell-ui";
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
    // Shell
    ShellModule.init({ appName: { full: "Near Earth Objects", short: "Neo" } }),
    // Material
    MatNativeDateModule,
    // features
    RouterModule.forRoot([{ path: "**", redirectTo: "", pathMatch: "full" }]),
    // ngxs
    NgxsModule.forRoot([], { developmentMode: !environment.production }),
    NeoDataModule.init(environment.api),
    ApiRateLimitDataModule.init(environment.api),
    NgxsLoggerPluginModule.forRoot({ disabled: environment.production }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
