import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from "@angular/common/http";
import { Inject, Injectable, InjectionToken } from "@angular/core";
import { Store } from "@ngxs/store";
import { Observable, tap } from "rxjs";
import { SetApiRateLimit } from "../data/api-rate-limit.actions";

export const API_WITH_RATE_LIMIT = new InjectionToken<string>(
  "The api to intercept and read the rate limit"
);

@Injectable({
  providedIn: "root",
})
export class ApiRateLimitInterceptor implements HttpInterceptor {
  private readonly limit = "x-ratelimit-limit";
  private readonly remaining = "x-ratelimit-remaining";

  public constructor(
    @Inject(API_WITH_RATE_LIMIT) private readonly api: string,
    private readonly store: Store
  ) {}

  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(req).pipe(
      tap((res) => {
        if (req.url.startsWith(this.api) && res instanceof HttpResponse)
          this.store.dispatch(
            new SetApiRateLimit({
              limit: Number(res.headers.get(this.limit)),
              remaining: Number(res.headers.get(this.remaining)),
            })
          );
      })
    );
  }
}
