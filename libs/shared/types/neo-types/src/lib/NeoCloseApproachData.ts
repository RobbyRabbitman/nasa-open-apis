import { NeoMissDistance, NeoRelativeVelocity } from "./NeoUnits";

export interface NeoCloseApproach {
  close_approach_date: string;
  close_approach_date_full: string;
  epoch_date_close_approach: number;
  relative_velocity: NeoRelativeVelocity;
  miss_distance: NeoMissDistance;
  orbiting_body: string;
}
