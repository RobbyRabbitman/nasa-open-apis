import { Injectable } from "@angular/core";
import { Rover } from "@nasa-open-apis/shared/types/mrp-types";
import { Action, State, StateContext } from "@ngxs/store";
import { map, Observable } from "rxjs";
import { MrpService } from "../..";
import { GetAllRovers } from "./mrp.actions";

export const MRP_STATE_NAME = "mrp";

export interface MrpStateModel {
  rovers: Rover[];
}

@State<MrpStateModel>({
  name: MRP_STATE_NAME,
  defaults: undefined,
})
@Injectable()
export class MrpState {
  public constructor(private readonly mrp: MrpService) {}

  @Action(GetAllRovers)
  public getAllRovers(ctx: StateContext<MrpStateModel>): Observable<void> {
    return this.mrp.getAllRovers().pipe(
      map((rovers) => {
        ctx.patchState({ rovers });
      })
    );
  }
}
