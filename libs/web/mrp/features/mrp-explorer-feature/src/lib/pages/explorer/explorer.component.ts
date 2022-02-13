import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { Camera, Photo, Rover } from "@nasa-open-apis/shared/types/mrp-types";
import { isNonNull } from "@nasa-open-apis/shared/util";
import {
  GetAllRovers,
  GetPhotos,
  MrpState,
} from "@nasa-open-apis/web/mrp/mrp-data";
import { Select, Store } from "@ngxs/store";
import {
  combineLatest,
  filter,
  map,
  Observable,
  shareReplay,
  switchMap,
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
})
export class ExplorerComponent implements OnInit {
  // form
  public readonly rover = new FormControl(undefined, Validators.required);
  public readonly date = new FormControl(undefined, Validators.required);
  public readonly cameras = new FormControl(undefined);
  public readonly form = new FormGroup({
    rover: this.rover,
    date: this.date,
  });
  // data
  @Select(MrpState.rovers)
  public rovers$!: Observable<Rover[]>;

  public photos$!: Observable<Photo[]>;

  public rover$ = this.rover.valueChanges.pipe(
    switchMap((name) =>
      this.rovers$.pipe(
        filter(isNonNull),
        map((rovers) => rovers.find((rover) => rover.name === name) as Rover),
        tap((rover) => this.cameras.setValue(rover.cameras))
      )
    ),
    shareReplay(1)
  );

  constructor(
    public readonly store: Store,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.store.dispatch(GetAllRovers);

    this.photos$ = combineLatest([
      this.form.valueChanges.pipe(
        filter(() => this.form.valid),
        switchMap(() =>
          this.store.dispatch(new GetPhotos(this.rover.value, this.date.value))
        ),
        switchMap(() =>
          this.store.select(MrpState.photos(this.rover.value, this.date.value))
        )
      ),
      this.cameras.valueChanges.pipe(
        map((cameras: Camera[]) => cameras.map(({ name }) => name))
      ),
    ]).pipe(
      map(([photos, cameras]) =>
        photos.filter((photo) => cameras.includes(photo.camera.name))
      )
    );

    // set form values, if passed
    this.rovers$
      .pipe(switchMap(() => this.route.queryParams))
      .subscribe(({ rover, date }: ExplorerQueryParams) => {
        isNonNull(rover) ? this.rover.setValue(rover) : undefined;
        isNonNull(date) ? this.date.setValue(new Date(date)) : undefined;
      });
  }
}
