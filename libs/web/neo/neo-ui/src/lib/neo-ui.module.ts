import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { EstimatedDiameterComponent } from "./components/estimated-diameter/estimated-diameter.component";
import { IsHarmlessBadgeComponent } from './components/is-harmless-badge/is-harmless-badge.component';
import { IsSentryObjectBadgeComponent } from './components/is-sentry-object-badge/is-sentry-object-badge.component';

@NgModule({
  imports: [CommonModule, MatIconModule],
  declarations: [EstimatedDiameterComponent, IsHarmlessBadgeComponent, IsSentryObjectBadgeComponent],
  exports: [EstimatedDiameterComponent, IsHarmlessBadgeComponent, IsSentryObjectBadgeComponent],
})
export class NeoUiModule {}
