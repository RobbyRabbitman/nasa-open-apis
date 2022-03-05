import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { NeoBrowse } from "@nasa-open-apis/shared/types/neo-types";
import { isNonNull } from "@nasa-open-apis/shared/util";
import {
  NeoGetBrowse,
  NeoSetPage,
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
  concat,
  filter,
  map,
  mapTo,
  merge,
  Observable,
  shareReplay,
  switchMap,
  tap,
} from "rxjs";

@Component({
  selector: "neo-browse",
  templateUrl: "./browse.component.html",
  styleUrls: ["./browse.component.scss"],
})
export class BrowseComponent implements OnInit {
  /**
   * Controls which columns get displayed.
   */
  public columns = [
    "name",
    "is_potentially_hazardous_asteroid",
    "estimated_diameter",
  ];

  /**
   * The data this component displays.
   */
  public browse$!: Observable<NeoBrowse>;

  /**
   * Total NEOs.
   */
  public total$!: Observable<number>;

  /**
   * Current page of the paginator.
   */
  public page$!: Observable<number>;

  /**
   * NEOs per page of the paginator.
   */
  public pageSize$!: Observable<number>;

  /**
   * Indicates whether a NEO Browse is loading.
   */
  public loading$!: Observable<boolean>;

  @ViewChild(MatPaginator, { static: true })
  private paginator!: MatPaginator;

  constructor(
    public readonly store: Store,
    private readonly actions$: Actions
  ) {}

  public ngOnInit() {
    /**
     * Get Browse via page event of paginator, start with page from store.
     * Sync store page with paginator page. Fetches a page only once cuz performance.
     */
    this.browse$ = concat(
      this.store
        .selectOnce<NeoStateModel>(NeoState)
        .pipe(map(({ page }) => page)),
      this.paginator.page.pipe(
        shareReplay(1),
        map(({ pageIndex }) => pageIndex),
        tap((page) => this.store.dispatch(new NeoSetPage(page)))
      )
    ).pipe(
      tap((page) =>
        this.store.selectOnce<NeoStateModel>(NeoState).subscribe({
          next: ({ browse }) =>
            !browse.has(page)
              ? this.store.dispatch(new NeoGetBrowse(page))
              : undefined,
        })
      ),
      switchMap((page) => this.store.select(NeoState.browse(page))),
      filter(isNonNull),
      shareReplay(1)
    );

    this.total$ = this.browse$.pipe(
      map((browse) => browse.page.total_elements)
    );

    this.page$ = this.store.select<NeoStateModel>(NeoState).pipe(
      map(({ page }) => page),
      shareReplay(1)
    );

    this.pageSize$ = this.browse$.pipe(
      map((browse) => browse.page.size),
      shareReplay(1)
    );

    this.loading$ = merge(
      concat(
        this.store
          .selectOnce<NeoStateModel>(NeoState)
          .pipe(map(({ page }) => page)),
        this.paginator.page.pipe(map(({ pageIndex }) => pageIndex))
      ).pipe(
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
