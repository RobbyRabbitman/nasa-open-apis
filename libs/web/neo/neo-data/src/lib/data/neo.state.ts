import { Injectable } from "@angular/core";
import { Neo, NeoBrowse } from "@nasa-open-apis/shared/types/neo-types";
import { Action, createSelector, State, StateContext } from "@ngxs/store";
import { map, mapTo, Observable, of } from "rxjs";
import { NeoService } from "../api/neo.service";
import {
  NeoGetBrowse,
  NeoGetFeed,
  NeoGetObject,
  NeoSetPage,
} from "./neo.actions";

export const NEO_STATE_NAME = "neo";

export type NeoBrowseMap = Map<number, NeoBrowse>;
export type NeoFeedMap = Map<string, Neo[]>;
export type NeoMap = Map<string, Neo>;

export interface NeoStateModel {
  browse: NeoBrowseMap;
  page: number;
  feed: NeoFeedMap;
  neo: NeoMap;
}

@State<NeoStateModel>({
  name: NEO_STATE_NAME,
  defaults: {
    browse: new Map<number, NeoBrowse>(),
    page: 0,
    feed: new Map<string, Neo[]>(),
    neo: new Map<string, Neo>(),
  },
})
@Injectable()
export class NeoState {
  public constructor(private readonly api: NeoService) {}

  public static neo(id: string) {
    return createSelector([NeoState], (state: NeoStateModel) =>
      state.neo.get(id)
    );
  }

  public static browse(page: number) {
    return createSelector([NeoState], (state: NeoStateModel) =>
      state.browse.get(page)
    );
  }

  @Action(NeoGetBrowse)
  public browse(
    ctx: StateContext<NeoStateModel>,
    { page }: NeoGetBrowse
  ): Observable<void> {
    return this.api.browse(page).pipe(
      map((browse) => {
        ctx.patchState({
          browse: ctx.getState().browse.set(browse.page.number, browse),
        });
      })
    );
  }

  @Action(NeoSetPage)
  public setPAge(
    ctx: StateContext<NeoStateModel>,
    { page }: NeoSetPage
  ): Observable<void> {
    return of(
      ctx.patchState({
        page,
      })
    ).pipe(mapTo(undefined));
  }

  @Action(NeoGetFeed)
  public feed(
    ctx: StateContext<NeoStateModel>,
    { start, end, detailed }: NeoGetFeed
  ): Observable<void> {
    return this.api.feed(start, end, detailed).pipe(
      map(({ near_earth_objects }) => {
        ctx.patchState({
          feed: Object.entries(near_earth_objects).reduce(
            (feed, [key, value]) => feed.set(key, value),
            ctx.getState().feed
          ),
        });
      })
    );
  }

  @Action(NeoGetObject)
  public object(
    ctx: StateContext<NeoStateModel>,
    { id }: NeoGetObject
  ): Observable<void> {
    return this.api.neo(id).pipe(
      map((neo) => {
        ctx.patchState({
          neo: ctx.getState().neo.set(neo.id, neo),
        });
      })
    );
  }
}
