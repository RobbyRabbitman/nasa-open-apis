import { HttpClient } from "@angular/common/http";
import { Inject, Injectable, InjectionToken } from "@angular/core";
import {
  Photo,
  PhotoManifest,
  Rover,
} from "@nasa-open-apis/shared/types/mrp-types";
import { isNonNull, removeNullish } from "@nasa-open-apis/shared/util";
import { map, Observable } from "rxjs";

export const MRP_API = new InjectionToken<string>("Mars Rover Photos api");

export interface ManifestResponse {
  photo_manifest: PhotoManifest;
}

export interface RoversResponse {
  rovers: Rover[];
}

export interface PhotosResponse {
  photos: Photo[];
}
export interface LatestPhotosResponse {
  latest_photos: Photo[];
}

interface AllPhotosOfRoverParams {
  sol?: number;
  earth_date?: string;
  camera?: string;
}

export interface GetPhotosOfRoverParams
  extends Omit<AllPhotosOfRoverParams, "earth_date"> {
  earth_date?: Date;
}

/** mrp api uses this format
 *
 * @param date
 * @returns yyyy-mm-dd
 */
export function dateToString(date: Date): string {
  return [
    date.getFullYear(),
    ("0" + (date.getMonth() + 1)).slice(-2),
    ("0" + date.getDate()).slice(-2),
  ].join("-");
}
@Injectable({
  providedIn: "root",
})
export class MrpService {
  public constructor(
    private readonly http: HttpClient,
    @Inject(MRP_API) private readonly api: string
  ) {}

  public getManifest(rover: string): Observable<PhotoManifest> {
    return this.http
      .get<ManifestResponse>(`${this.api}/manifests/${rover}`)
      .pipe(map(({ photo_manifest }) => photo_manifest));
  }

  public getAllRovers(): Observable<Rover[]> {
    return this.http
      .get<RoversResponse>(`${this.api}/rovers`)
      .pipe(map(({ rovers }) => rovers));
  }

  public getPhotos(
    rover: string,
    { earth_date, ...rest }: GetPhotosOfRoverParams
  ): Observable<Photo[]> {
    const params = removeNullish(rest);
    if (isNonNull(earth_date)) params.earth_date = dateToString(earth_date);
    return this.http
      .get<PhotosResponse>(`${this.api}/rovers/${rover}/photos`, {
        params,
      })
      .pipe(map(({ photos }) => photos));
  }

  public getLatestPhotos(rover: string): Observable<Photo[]> {
    return this.http
      .get<LatestPhotosResponse>(`${this.api}/rovers/${rover}/latest_photos`)
      .pipe(map(({ latest_photos }) => latest_photos));
  }
}
