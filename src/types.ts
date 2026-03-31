export interface Job {
  title: string;
  location: Location;
  dept: string;
  href: string;
  reqId?: string;
}

interface Location {
  country: string;
  city?: string;
  state?: string;
  remote?: string;
}
