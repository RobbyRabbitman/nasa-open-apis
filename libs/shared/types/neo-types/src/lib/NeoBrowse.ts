import { Neo } from "./Neo";
import { NeoLinks } from "./NeoLinks";

export interface NeoBrowse {
  links: NeoLinks;
  page: NeoPage;
  near_earth_objects: Neo[];
}

export interface NeoPage {
  size: number;
  total_elements: number;
  total_pages: number;
  number: number;
}
