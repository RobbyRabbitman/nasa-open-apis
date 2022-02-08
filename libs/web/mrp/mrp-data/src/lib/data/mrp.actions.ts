export class GetAllRovers {
  public static readonly type = "[GetAllRovers] Get All Rovers";
}
export class GetManifest {
  public static readonly type = "[GetManifest] Get Manifest";
  public constructor(public readonly rover: string) {}
}
