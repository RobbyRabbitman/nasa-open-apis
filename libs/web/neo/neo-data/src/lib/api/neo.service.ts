import { HttpClient } from "@angular/common/http";
import { Inject, Injectable, InjectionToken } from "@angular/core";
import {
  Neo,
  NeoBrowse,
  NeoFeed,
} from "@nasa-open-apis/shared/types/neo-types";
import { Observable } from "rxjs";

export const NEO_API = new InjectionToken<string>("Near Earth Object api");

//TODO mrp uses this also => util?
/** neo api uses this format
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
export class NeoService {
  constructor(
    private readonly http: HttpClient,
    @Inject(NEO_API) private readonly api: string
  ) {}

  public neo(id: string): Observable<Neo> {
    return this.http.get<Neo>(`${this.api}/neo/${id}`);
  }

  public feed(start: Date, end: Date, detailed: boolean): Observable<NeoFeed> {
    return this.http.get<NeoFeed>(`${this.api}/feed`, {
      params: {
        start_date: dateToString(start),
        end_date: dateToString(end),
        detailed,
      },
    });
  }

  public browse(page: number): Observable<NeoBrowse> {
    return this.http.get<NeoBrowse>(`${this.api}/neo/browse`, {
      params: { page },
    });
  }
}
