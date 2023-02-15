import { select } from 'd3';
import { type IMargin } from '../models/margin';

export function createSvg(
  selector: string,
  svgId: string,
  svgWidth: number,
  svgHeight: number,
): d3.Selection<SVGSVGElement, unknown, HTMLElement, any> {
  return select(selector)
    .append('svg')
    .attr('id', svgId)
    .attr('width', svgWidth)
    .attr('height', svgHeight);
}

export function createSvgGroup(
  svg: d3.Selection<SVGSVGElement, unknown, HTMLElement, any>,
  margin: IMargin,
) {
  return svg.append('g').attr('transform', `translate(${margin.left}, ${margin.top})`);
}

export const clearSvg = (selector: string) => {
  return select(selector).remove();
};
