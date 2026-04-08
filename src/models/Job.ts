import { Location } from '#src/models/Location.ts';

export interface Job {
  title: string;
  location: Location;
  dept: string;
  href: string;
  reqId?: string;
}
