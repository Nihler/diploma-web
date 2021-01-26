import { Locations } from './locations';

export class Path {
  locations: Array<Locations>;
  runStart: Date;
  runStop: Date;
  avgSpeed: number;
  distance: number;
}
