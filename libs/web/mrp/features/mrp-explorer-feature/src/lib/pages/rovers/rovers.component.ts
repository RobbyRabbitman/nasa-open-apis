import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Rover } from "@nasa-open-apis/shared/types/mrp-types";
import {
  dateToString,
  GetAllRovers,
  MrpState,
} from "@nasa-open-apis/web/mrp/mrp-data";
import { Select, Store } from "@ngxs/store";
import { Observable } from "rxjs";
import { EXPLORER_PAGE } from "../../routes/routes";
import { ExplorerQueryParams } from "../explorer/explorer.component";

@Component({
  selector: "nasa-open-apis-rovers",
  templateUrl: "./rovers.component.html",
  styleUrls: ["./rovers.component.scss"],
})
export class RoversComponent implements OnInit {
  @Select(MrpState.rovers)
  public rovers$!: Observable<Rover[]>;

  constructor(private readonly store: Store, private readonly router: Router) {}

  ngOnInit(): void {
    this.store.dispatch(GetAllRovers);
  }

  public async explore({ name, max_date }: Rover): Promise<boolean> {
    const queryParams: ExplorerQueryParams = {
      rover: name,
      date: dateToString(new Date(max_date)),
    };
    return this.router.navigate([EXPLORER_PAGE], {
      queryParams,
    });
  }
}
