import { ApiRateLimit } from "@nasa-open-apis/web/api-rate-limit/api-rate-limit-types";

export class SetApiRateLimit {
  public static readonly type = "[ApiRateLimit] Set ApiRateLimit";
  public constructor(public readonly apiRateLimit: ApiRateLimit) {}
}
