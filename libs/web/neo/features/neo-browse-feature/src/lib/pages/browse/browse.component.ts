import { AfterViewInit, Component, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { NeoBrowse } from "@nasa-open-apis/shared/types/neo-types";
import { isNonNull } from "@nasa-open-apis/shared/util";
import {
  NeoGetBrowse,
  NeoState,
  NeoStateModel,
} from "@nasa-open-apis/web/neo/neo-data";
import {
  Actions,
  ofActionDispatched,
  ofActionSuccessful,
  Store,
} from "@ngxs/store";
import {
  combineLatest,
  filter,
  map,
  mapTo,
  merge,
  Observable,
  shareReplay,
  startWith,
  switchMap,
  tap,
} from "rxjs";

@Component({
  selector: "neo-browse",
  templateUrl: "./browse.component.html",
  styleUrls: ["./browse.component.scss"],
})
export class BrowseComponent implements AfterViewInit {
  public columns = [
    "name",
    "is_potentially_hazardous_asteroid",
    "estimated_diameter",
  ];
  public browse$!: Observable<NeoBrowse>;
  public length$!: Observable<number>;
  public size$!: Observable<number[]>;

  @ViewChild(MatPaginator)
  public paginator!: MatPaginator;

  public loading$!: Observable<boolean>;

  constructor(
    public readonly store: Store,
    private readonly actions$: Actions
  ) {}

  public ngAfterViewInit() {
    this.browse$ = combineLatest([
      this.paginator.page.pipe(
        shareReplay(1),
        map(({ pageIndex }) => pageIndex),
        startWith(0),
        tap((page) =>
          this.store.selectOnce<NeoStateModel>(NeoState).subscribe({
            next: ({ browse }) =>
              !browse.has(page)
                ? this.store.dispatch(new NeoGetBrowse(page))
                : undefined,
          })
        )
      ),
      this.store.select<NeoStateModel>(NeoState).pipe(
        shareReplay(1),
        map(({ browse }) => browse)
      ),
    ]).pipe(
      map(([page, map]) => map.get(page)),
      filter(isNonNull),
      shareReplay(1)
    );
    this.length$ = this.browse$.pipe(
      map((browse) => browse.page.total_elements)
    );
    this.size$ = this.browse$.pipe(map((browse) => [browse.page.size]));

    this.loading$ = merge(
      this.paginator.page.pipe(
        map(({ pageIndex }) => pageIndex),
        switchMap((page) =>
          this.store
            .selectOnce<NeoStateModel>(NeoState)
            .pipe(map(({ browse }) => !browse.has(page)))
        )
      ),
      this.actions$.pipe(ofActionDispatched(NeoGetBrowse), mapTo(true)),
      this.actions$.pipe(ofActionSuccessful(NeoGetBrowse), mapTo(false))
    ).pipe(shareReplay(1));
  }
}
