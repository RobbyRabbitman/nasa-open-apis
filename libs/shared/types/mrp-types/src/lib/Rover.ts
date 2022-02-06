import { Camera } from "..";

export type RoverName = "Perseverance" | "Curiosity" | "Opportunity" | "Spirit";

export interface Rover {
  id: number;
  name: RoverName;
  landing_date: string;
  launch_date: string;
  status: string;
  max_sol: number;
  max_date: string;
  total_photos: number;
  cameras: Camera[];
}
