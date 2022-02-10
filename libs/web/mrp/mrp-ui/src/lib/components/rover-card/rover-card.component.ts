import { Component, Input } from "@angular/core";
import { Rover } from "@nasa-open-apis/shared/types/mrp-types";

@Component({
  selector: "mrp-ui-rover-card",
  templateUrl: "./rover-card.component.html",
  styleUrls: ["./rover-card.component.scss"],
})
export class RoverCardComponent {
  @Input()
  public rover?: Rover;

  @Input()
  public src?: string;
}
