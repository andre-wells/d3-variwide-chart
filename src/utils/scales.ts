import { type ScaleLinear, scaleLinear, scaleTime, type Numeric } from 'd3';
import * as d3 from 'd3';

export function getMaxRange<T, U extends Numeric>(
  iterable: Iterable<T>,
  accessor: (datum: T, index: number, array: Iterable<T>) => U | undefined | null,
  tickFactor: number,
): number | undefined {
  const max = d3.max(iterable, accessor);
  if (max == null) return tickFactor;

  const maxNum = max as unknown as number;

  let maxFactor = Math.floor(tickFactor / maxNum);

  if (maxFactor > 0) return tickFactor;
  else {
    maxFactor = Math.floor(maxNum / tickFactor);
    return tickFactor * (maxFactor + 1);
  }
}

export function getMaxRangeFromValue<T, U extends Numeric>(
  range: number,
  tickFactor: number,
): number | undefined {
  const maxNum = range;

  let maxFactor = Math.floor(tickFactor / maxNum);

  if (maxFactor > 0) return tickFactor;
  else {
    maxFactor = Math.floor(maxNum / tickFactor);
    return tickFactor * (maxFactor + 1);
  }
}

export function getMinRange<T, U extends Numeric>(
  iterable: Iterable<T>,
  accessor: (datum: T, index: number, array: Iterable<T>) => U | undefined | null,
  tickFactor: number,
): number | undefined {
  const min = d3.min(iterable, accessor);
  if (min == null) return 0;

  if ((min as unknown as number) >= 0) return 0;

  const minNum = Math.abs(min as unknown as number);
  let minFactor = Math.floor(tickFactor / minNum);

  if (minFactor > 0) return tickFactor * -1;
  else {
    minFactor = Math.floor(minNum / tickFactor);
    return tickFactor * (minFactor + 1) * -1;
  }
}

export function linearScale(rangeValues: Iterable<number>): ScaleLinear<number, number, never> {
  return scaleLinear().range(rangeValues);
}

export function timeScale(rangeValues: Iterable<number>) {
  return scaleTime().range(rangeValues);
}
