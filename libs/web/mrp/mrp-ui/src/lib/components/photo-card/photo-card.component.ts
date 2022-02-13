import { Component, Input } from "@angular/core";
import { Photo } from "@nasa-open-apis/shared/types/mrp-types";

@Component({
  selector: "mrp-ui-photo-card",
  templateUrl: "./photo-card.component.html",
  styleUrls: ["./photo-card.component.scss"],
})
export class PhotoCardComponent {
  @Input()
  public photo?: Photo;
}
