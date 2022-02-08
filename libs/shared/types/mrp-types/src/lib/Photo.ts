import { Camera } from "./Camera";
import { Rover } from "./Rover";

export type PhotoRoverType = Pick<
  Rover,
  "id" | "name" | "landing_date" | "launch_date" | "status"
>;
export interface Photo {
  id: number;
  sol: number;
  earth_date: string;
  img_src: string;
  rover: PhotoRoverType;
  camera: Camera;
}
