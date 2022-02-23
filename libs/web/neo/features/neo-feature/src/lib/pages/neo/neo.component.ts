import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Neo } from "@nasa-open-apis/shared/types/neo-types";
import { isNonNull } from "@nasa-open-apis/shared/util";
import { NeoGetObject, NeoState } from "@nasa-open-apis/web/neo/neo-data";
import { Store } from "@ngxs/store";
import { filter, Observable, pluck, switchMap, tap } from "rxjs";
import { NEO_PAGE_ID_PARAM } from "../../routes/routes";

@Component({
  selector: "neo-neo",
  templateUrl: "./neo.component.html",
  styleUrls: ["./neo.component.scss"],
})
export class NeoComponent implements OnInit {
  public neo$!: Observable<Neo>;

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly store: Store
  ) {}

  ngOnInit(): void {
    this.neo$ = this.route.queryParams.pipe(
      pluck(NEO_PAGE_ID_PARAM),
      tap((id) =>
        this.store.dispatch(new NeoGetObject(id)).subscribe({
          error: () => this.router.navigateByUrl(""),
        })
      ),
      switchMap((id) => this.store.select(NeoState.neo(id))),
      filter(isNonNull)
    );
  }
}
