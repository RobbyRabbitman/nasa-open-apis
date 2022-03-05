import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { Neo } from "@nasa-open-apis/shared/types/neo-types";

@Component({
  selector: "neo-ui-is-harmless-badge",
  templateUrl: "./is-harmless-badge.component.html",
  styleUrls: ["./is-harmless-badge.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IsHarmlessBadgeComponent {
  @Input()
  public neo?: Neo;
}
