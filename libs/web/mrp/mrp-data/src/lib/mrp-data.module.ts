import { ModuleWithProviders, NgModule } from "@angular/core";
import { NgxsModule } from "@ngxs/store";
import { MRP_API } from "./api/mrp.service";
import { MrpState } from "./data/mrp.state";

@NgModule({
  imports: [NgxsModule.forFeature([MrpState])],
})
export class MrpDataModule {
  public static init(api: string): ModuleWithProviders<MrpDataModule> {
    return {
      ngModule: MrpDataModule,
      providers: [{ provide: MRP_API, useValue: api }],
    };
  }
}
