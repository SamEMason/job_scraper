interface ParsedLocation {
  country: string;
  city: string | null;
  state: string | null;
  remote?: boolean;
}

export class Location {
  public country: string;
  public city: string | null;
  public state: string | null;
  public remote?: boolean;

  constructor(raw: string) {
    const parsed = this.parse(raw);

    this.country = parsed.country;
    this.city = parsed.city;
    this.state = parsed.state;
    this.remote = parsed.remote;
  }

  private parse(raw: string): ParsedLocation {
    const parts = raw.split(',');

    if (parts.length === 3) {
      return {
        country: parts[2].trim(),
        city: parts[0].trim(),
        state: parts[1].trim(),
        remote: false,
      };
    } else {
      return {
        country: parts[1].trim(),
        city: null,
        state: null,
        remote: true,
      };
    }
  }
}
