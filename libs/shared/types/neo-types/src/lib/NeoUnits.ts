export interface NeoEstimatedDiameter {
  kilometers: NeoDiameterRange;
  meters: NeoDiameterRange;
  miles: NeoDiameterRange;
  feet: NeoDiameterRange;
}

export interface NeoDiameterRange {
  estimated_diameter_min: number;
  estimated_diameter_max: number;
}

export interface NeoRelativeVelocity {
  kilometers_per_second: string;
  kilometers_per_hour: string;
  miles_per_hour: string;
}

export interface NeoMissDistance {
  astronomical: string;
  lunar: string;
  kilometers: string;
  miles: string;
}
