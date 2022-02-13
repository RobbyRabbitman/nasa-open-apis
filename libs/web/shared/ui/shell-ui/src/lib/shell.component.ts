import { Component, Inject } from "@angular/core";
import { ShellConfig } from "./shell";
import { SHELL_CONFIG } from "./shell.token";

@Component({
  selector: "nasa-open-apis-shell",
  templateUrl: "./shell.component.html",
  styleUrls: ["./shell.component.scss"],
})
export class ShellComponent {
  constructor(
    @Inject(SHELL_CONFIG)
    public readonly config: ShellConfig
  ) {}
}
