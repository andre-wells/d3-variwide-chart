import { type Datum } from './models';

export function sortData(data: Datum[]): Datum[] {
  const result = data.sort((a, b) => a.y - b.y);
  return result;
}
