import { Injectable } from "@angular/core";
import { ApiRateLimit } from "@nasa-open-apis/web/api-rate-limit/api-rate-limit-types";
import { Action, State, StateContext } from "@ngxs/store";
import { SetApiRateLimit } from "./api-rate-limit.actions";

export const API_RATE_LIMIT_STATE_NAME = "api_rate_limit";

export type ApiRateLimitStateModel = ApiRateLimit;

@State<ApiRateLimitStateModel>({
  name: API_RATE_LIMIT_STATE_NAME,
  defaults: undefined,
})
@Injectable()
export class ApiRateLimitState {
  @Action(SetApiRateLimit)
  public setApiRateLimit(
    ctx: StateContext<ApiRateLimitStateModel>,
    { apiRateLimit }: SetApiRateLimit
  ) {
    ctx.setState(apiRateLimit);
  }
}
