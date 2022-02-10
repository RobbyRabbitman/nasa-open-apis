import { Component, OnInit } from "@angular/core";
import { Rover } from "@nasa-open-apis/shared/types/mrp-types";
import { GetAllRovers, MrpState } from "@nasa-open-apis/web/mrp/mrp-data";
import { Select, Store } from "@ngxs/store";
import { Observable } from "rxjs";

@Component({
  selector: "nasa-open-apis-rovers",
  templateUrl: "./rovers.component.html",
  styleUrls: ["./rovers.component.scss"],
})
export class RoversComponent implements OnInit {
  @Select(MrpState.rovers)
  public rovers$!: Observable<Rover[]>;

  constructor(private readonly store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(GetAllRovers);
  }
}
