interface ParsedLocation {
  country: string | null;
  city: string | null;
  state: string | null;
  remote: boolean;
}

export class Location {
  public country: string | null;
  public city: string | null;
  public state: string | null;
  public remote: boolean;

  constructor(raw: string, isRemote: boolean) {
    const parsed = this.parse(raw, isRemote);

    this.country = parsed.country;
    this.city = parsed.city;
    this.state = parsed.state;
    this.remote = parsed.remote;
  }

  private parse(raw: string, isRemote: boolean): ParsedLocation {
    const parts = raw.split(',').map((part) => part.trim());

    if (parts[0]?.toLowerCase() === 'remote') {
      return {
        country: parts[1] || parts[0] || null,
        city: null,
        state: null,
        remote: true,
      };
    } else {
      return {
        country: parts[2] || parts[1] || parts[0] || null,
        city: parts[0] || null,
        state: parts[1] || null,
        remote: isRemote,
      };
    }
  }
}
