import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { Neo } from "@nasa-open-apis/shared/types/neo-types";

@Component({
  selector: "neo-ui-is-sentry-object-badge",
  templateUrl: "./is-sentry-object-badge.component.html",
  styleUrls: ["./is-sentry-object-badge.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IsSentryObjectBadgeComponent {
  @Input()
  public neo?: Neo;
}
