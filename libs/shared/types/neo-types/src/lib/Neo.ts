import { NeoCloseApproach } from "./NeoCloseApproachData";
import { NeoLinks } from "./NeoLinks";
import { NeoOrbit } from "./NeoOrbit";
import { NeoEstimatedDiameter } from "./NeoUnits";

export interface Neo {
  links: NeoLinks;
  id: string;
  neo_reference_id: string;
  name: string;
  designation: string;
  nasa_jpl_url: string;
  absolute_magnitude_h: number;
  estimated_diameter: NeoEstimatedDiameter;
  is_potentially_hazardous_asteroid: boolean;
  close_approach_data: NeoCloseApproach[];
  orbital_data: NeoOrbit;
  is_sentry_object: boolean;
}
