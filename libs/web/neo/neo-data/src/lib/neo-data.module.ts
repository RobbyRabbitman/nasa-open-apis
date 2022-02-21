import { ModuleWithProviders, NgModule } from "@angular/core";
import { NgxsModule } from "@ngxs/store";
import { NEO_API } from "./api/neo.service";
import { NeoState } from "./data/neo.state";

@NgModule({
  imports: [NgxsModule.forFeature([NeoState])],
})
export class NeoDataModule {
  public static init(api: string): ModuleWithProviders<NeoDataModule> {
    return {
      ngModule: NeoDataModule,
      providers: [{ provide: NEO_API, useValue: api }],
    };
  }
}
