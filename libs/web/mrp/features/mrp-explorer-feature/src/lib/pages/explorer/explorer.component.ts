import { Component, OnDestroy, OnInit, ViewEncapsulation } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { Camera, Photo, Rover } from "@nasa-open-apis/shared/types/mrp-types";
import { isNonNull } from "@nasa-open-apis/shared/util";
import {
  dateToString,
  GetAllRovers,
  GetPhotos,
  MrpState,
} from "@nasa-open-apis/web/mrp/mrp-data";
import {
  Actions,
  ofActionDispatched,
  ofActionSuccessful,
  Select,
  Store,
} from "@ngxs/store";
import {
  combineLatest,
  distinctUntilChanged,
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

export interface ExplorerQueryParams {
  /**
   * Name of a Rover
   */
  rover?: string;
  date?: string;
}

@Component({
  selector: "nasa-open-apis-explorer",
  templateUrl: "./explorer.component.html",
  styleUrls: ["./explorer.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class ExplorerComponent implements OnInit, OnDestroy {
  // helper
  private destroy$ = new Subject<void>();

  // form
  public readonly rover = new FormControl(null, Validators.required);
  public readonly date = new FormControl(null, Validators.required);
  public readonly cameras = new FormControl(null);
  public readonly form = new FormGroup({
    rover: this.rover,
    date: this.date,
  });
  // data
  @Select(MrpState.rovers)
  public rovers$!: Observable<Rover[]>;

  public photos$!: Observable<Photo[]>;
  public loadingPhotos$ = merge(
    this.actions$.pipe(ofActionDispatched(GetPhotos), mapTo(true)),
    this.actions$.pipe(ofActionSuccessful(GetPhotos), mapTo(false))
  ).pipe(startWith(false), shareReplay(1));

  public rover$ = this.rover.valueChanges.pipe(
    switchMap((name) =>
      this.rovers$.pipe(
        filter(isNonNull),
        map((rovers) => rovers.find((rover) => rover.name === name) as Rover),
        tap((rover) => {
          this.cameras.setValue(rover.cameras);
          this.date.setValue(new Date(rover.max_date));
        })
      )
    ),
    shareReplay(1)
  );

  public min$ = this.rover$.pipe(map((rover) => new Date(rover.landing_date)));
  public max$ = this.rover$.pipe(map((rover) => new Date(rover.max_date)));

  constructor(
    public readonly store: Store,
    private readonly route: ActivatedRoute,
    private readonly actions$: Actions
  ) {}

  ngOnInit(): void {
    this.store.dispatch(GetAllRovers);

    this.photos$ = combineLatest([
      this.form.valueChanges.pipe(
        distinctUntilChanged(
          (prev, curr) =>
            prev.rover === curr.rover &&
            dateToString(prev.date) === dateToString(curr.date)
        ),
        // after cd894caa81e8258528d7a611020c46f6dda590a5 this.form.valid doesnt work, date with time outside range w/e ???
        filter(() => isNonNull(this.rover.value) && isNonNull(this.date.value)),
        switchMap(() =>
          this.store.dispatch(new GetPhotos(this.rover.value, this.date.value))
        ),
        switchMap(() =>
          this.store.select(MrpState.photos(this.rover.value, this.date.value))
        ),
        shareReplay(1)
      ),
      this.cameras.valueChanges.pipe(
        map((cameras: Camera[]) => cameras.map(({ name }) => name))
      ),
    ]).pipe(
      map(([photos, cameras]) =>
        photos.filter((photo) => cameras.includes(photo.camera.name))
      ),
      shareReplay(1)
    );

    // set form values, if passed
    this.rovers$
      .pipe(
        filter(isNonNull),
        switchMap(() => this.route.queryParams),
        takeUntil(this.destroy$)
      )
      .subscribe(({ rover, date }: ExplorerQueryParams) => {
        isNonNull(rover) ? this.rover.setValue(rover) : undefined;
        isNonNull(date) ? this.date.setValue(new Date(date)) : undefined;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
