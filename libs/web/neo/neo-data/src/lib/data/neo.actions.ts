export class NeoGetBrowse {
  public static readonly type = "[NeoBrowsePage] Get Browse";
  public constructor(public readonly page: number) {}
}

export class NeoGetFeed {
  public static readonly type = "[NeoGetFeed] Get Feed";
  public constructor(
    public readonly start: Date,
    public readonly end: Date,
    public readonly detailed = false
  ) {}
}

export class NeoGetObject {
  public static readonly type = "[NeoGetObject] Get Object";
  public constructor(public readonly id: string) {}
}
