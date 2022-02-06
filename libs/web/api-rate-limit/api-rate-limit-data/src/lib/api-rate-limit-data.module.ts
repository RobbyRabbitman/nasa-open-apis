import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { ModuleWithProviders, NgModule } from "@angular/core";
import { NgxsModule } from "@ngxs/store";
import {
  ApiRateLimitInterceptor,
  API_WITH_RATE_LIMIT,
} from "./api/api-rate-limit.interceptor";
import { ApiRateLimitState } from "./data/api-rate-limit.state";

@NgModule({ imports: [NgxsModule.forFeature([ApiRateLimitState])] })
export class ApiRateLimitDataModule {
  public static init(api: string): ModuleWithProviders<ApiRateLimitDataModule> {
    return {
      ngModule: ApiRateLimitDataModule,
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useExisting: ApiRateLimitInterceptor,
          multi: true,
        },
        { provide: API_WITH_RATE_LIMIT, useValue: api },
      ],
    };
  }
}
