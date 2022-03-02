import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
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
  combineLatest,
  concat,
  filter,
  map,
  mapTo,
  merge,
  Observable,
  shareReplay,
  startWith,
  Subject,
  switchMap,
  takeUntil,
  tap,
} from "rxjs";

@Component({
  selector: "neo-browse",
  templateUrl: "./browse.component.html",
  styleUrls: ["./browse.component.scss"],
})
export class BrowseComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  public columns = [
    "name",
    "is_potentially_hazardous_asteroid",
    "estimated_diameter",
  ];
  public browse$!: Observable<NeoBrowse>;
  public length$!: Observable<number>;
  public page$!: Observable<number>;
  public size$!: Observable<number[]>;

  @ViewChild(MatPaginator, { static: true })
  public paginator!: MatPaginator;

  public loading$!: Observable<boolean>;

  constructor(
    public readonly store: Store,
    private readonly actions$: Actions
  ) {}

  public ngOnInit() {
    this.browse$ = combineLatest([
      concat(
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

    this.page$ = this.store.select<NeoStateModel>(NeoState).pipe(
      map(({ page }) => page),
      shareReplay(1)
    );

    this.browse$
      .pipe(
        map((browse) => browse.page.size),
        takeUntil(this.destroy$)
      )
      .subscribe({ next: (size) => (this.paginator.pageSize = size) });

    this.loading$ = merge(
      this.paginator.page.pipe(
        map(({ pageIndex }) => pageIndex),
        startWith(0),
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

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
