import { HttpClient } from "@angular/common/http";
import { Inject, Injectable, InjectionToken } from "@angular/core";
import {
  Neo,
  NeoBrowse,
  NeoFeed,
} from "@nasa-open-apis/shared/types/neo-types";
import { Observable } from "rxjs";

export const NEO_API = new InjectionToken<string>("Near Earth Object api");

@Injectable({
  providedIn: "root",
})
export class NeoService {
  constructor(
    private readonly http: HttpClient,
    @Inject(NEO_API) private readonly api: string
  ) {}

  public neo(id: string): Observable<Neo> {
    return this.http.get<Neo>(`${this.api}/neo/${id}`);
  }

  /**
   *
   * @param start_date YYYY-MM-DD
   * @param end_date YYYY-MM-DD
   * @param detailed
   * @returns
   */
  public feed(
    start_date: string,
    end_date: string,
    detailed: boolean = false
  ): Observable<NeoFeed> {
    return this.http.get<NeoFeed>(`${this.api}/feed`, {
      params: { start_date, end_date, detailed },
    });
  }

  public browse(page: number = 0, size: number = 20): Observable<NeoBrowse> {
    return this.http.get<NeoBrowse>(`${this.api}/neo/browse`, {
      params: { page, size },
    });
  }
}
