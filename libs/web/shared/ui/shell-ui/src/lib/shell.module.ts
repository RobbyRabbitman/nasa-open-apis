import { CommonModule } from "@angular/common";
import { ModuleWithProviders, NgModule } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatToolbarModule } from "@angular/material/toolbar";
import { RouterModule } from "@angular/router";
import { ShellConfig, SHELL_CONFIG } from "..";
import { ShellComponent } from "./shell.component";

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
  ],
  declarations: [ShellComponent],
  exports: [ShellComponent],
})
export class ShellModule {
  public static init(config: ShellConfig): ModuleWithProviders<ShellModule> {
    return {
      ngModule: ShellModule,
      providers: [{ provide: SHELL_CONFIG, useValue: config }],
    };
  }
}
