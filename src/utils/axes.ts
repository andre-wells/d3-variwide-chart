import { axisBottom, axisLeft } from 'd3';

export function createXAxis(group: any, height: number, x: any) {
  return group.append('g').attr('transform', `translate(0, ${height})`).call(axisBottom(x));
}

export function createYAxis(group: any, y: any) {
  return group.append('g').call(axisLeft(y));
}
