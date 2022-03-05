import { Component, Input } from "@angular/core";
import { Neo } from "@nasa-open-apis/shared/types/neo-types";

@Component({
  selector: "neo-ui-estimated-diameter",
  templateUrl: "./estimated-diameter.component.html",
  styleUrls: ["./estimated-diameter.component.scss"],
})
export class EstimatedDiameterComponent {
  @Input()
  public neo?: Neo;
}
