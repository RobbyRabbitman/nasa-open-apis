export class GetAllRovers {
  public static readonly type = "[GetAllRovers] Get All Rovers";
}
export class GetManifest {
  public static readonly type = "[GetManifest] Get Manifest";
  public constructor(public readonly rover: string) {}
}
export class GetPhotos {
  public static readonly type = "[GetManifest] Get Photos";
  public constructor(
    public readonly rover: string,
    public readonly date: string
  ) {}
}
export class GetLatestPhotos {
  public static readonly type = "[GetManifest] Get Latest Photos";
  public constructor(public readonly rover: string) {}
}
