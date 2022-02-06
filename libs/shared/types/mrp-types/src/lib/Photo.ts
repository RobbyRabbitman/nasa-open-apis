import { Camera } from "./Camera";
import { Rover } from "./Rover";

export interface Photo {
  id: number;
  sol: number;
  earth_date: string;
  img_src: string;
  rover: Rover;
  camera: Camera;
}
