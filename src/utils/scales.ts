import { type ScaleLinear, scaleLinear, scaleTime } from 'd3';

export function linearScale(rangeValues: Iterable<number>): ScaleLinear<number, number, never> {
  return scaleLinear().range(rangeValues);
}

export function timeScale(rangeValues: Iterable<number>) {
  return scaleTime().range(rangeValues);
}
