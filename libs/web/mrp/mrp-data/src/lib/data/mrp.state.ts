import { Injectable } from "@angular/core";
import { PhotoManifest, Rover } from "@nasa-open-apis/shared/types/mrp-types";
import {
  Action,
  createSelector,
  Selector,
  State,
  StateContext,
} from "@ngxs/store";
import { map, Observable } from "rxjs";
import { MrpService } from "../..";
import { GetAllRovers, GetManifest } from "./mrp.actions";

export const MRP_STATE_NAME = "mrp";

export interface MrpStateModel {
  rovers: Rover[];
  manifests: Map<string, PhotoManifest>;
}

@State<MrpStateModel>({
  name: MRP_STATE_NAME,
  defaults: undefined,
})
@Injectable()
export class MrpState {
  public constructor(private readonly mrp: MrpService) {}

  public static manifest(rover: string) {
    return createSelector([MrpState], (state: MrpStateModel) =>
      state?.manifests?.get(rover)
    );
  }

  @Selector()
  public static state(state: MrpStateModel): MrpStateModel {
    return state;
  }

  @Action(GetManifest)
  public getManifest(
    ctx: StateContext<MrpStateModel>,
    { rover }: GetManifest
  ): Observable<void> {
    return this.mrp.getManifest(rover).pipe(
      map((manifest) => {
        ctx.patchState({
          manifests: (ctx.getState().manifests ?? new Map()).set(
            rover,
            manifest
          ),
        });
      })
    );
  }

  @Action(GetAllRovers)
  public getAllRovers(ctx: StateContext<MrpStateModel>): Observable<void> {
    return this.mrp.getAllRovers().pipe(
      map((rovers) => {
        ctx.patchState({ rovers });
      })
    );
  }
}
