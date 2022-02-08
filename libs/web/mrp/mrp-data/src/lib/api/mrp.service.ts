import { HttpClient } from "@angular/common/http";
import { Inject, Injectable, InjectionToken } from "@angular/core";
import {
  Photo,
  PhotoManifest,
  Rover,
} from "@nasa-open-apis/shared/types/mrp-types";
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

export type GetPhotosOfRoverParams =
  | Omit<AllPhotosOfRoverParams, "sol">
  | Omit<AllPhotosOfRoverParams, "earth_date">;

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
    params: GetPhotosOfRoverParams
  ): Observable<Photo[]> {
    return this.http
      .get<PhotosResponse>(`${this.api}/rovers/${rover}/photos`, { params })
      .pipe(map(({ photos }) => photos));
  }

  public getLatestPhotos(rover: string): Observable<Photo[]> {
    return this.http
      .get<LatestPhotosResponse>(`${this.api}/rovers/${rover}/latest_photos`)
      .pipe(map(({ latest_photos }) => latest_photos));
  }
}