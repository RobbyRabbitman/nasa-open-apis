import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { Neo } from "@nasa-open-apis/shared/types/neo-types";

@Component({
  selector: "neo-ui-sentry-status",
  templateUrl: "./sentry-status.component.html",
  styleUrls: ["./sentry-status.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SentryStatusComponent {
  @Input()
  public neo?: Neo;
}
