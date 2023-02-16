import * as d3 from 'd3';
import { useEffect, useRef } from 'react';
import { getColor } from './colors';
import { type Datum, type IMargin } from './models';
import { sortData } from './utils';

interface IProps {
  width: number;
  height: number;
  margin: IMargin;
  data: Datum[];
}

export const VaribleWidthBarChart = (props: IProps) => {
  const { width, height, margin, data } = props;

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ignore = false;
    if (!ignore) {
      Populate(data);
    }
    return () => {
      ignore = true;
    };
  }, []);

  const Populate = (data: Datum[]) => {
    const container = d3.select(containerRef.current);
    if (container === null || container === undefined) return;

    // Setup SVG Element
    container.select('svg').remove();
    const svg = container.append('svg').attr('width', width).attr('height', height);

    // Get ranges of the chart
    const minYRange = d3.min(data, (d) => d.y) ?? 0;
    const maxYRange = d3.max(data, (d) => d.y) ?? 0;

    const maxXRange = data.reduce((acc, curr) => {
      return acc + curr.x;
    }, 0);

    // Define scales
    const xScale = d3
      .scaleLinear()
      .domain([0, maxXRange ?? 0])
      .range([margin.left, width - margin.right])
      .nice();

    const yScale = d3
      .scaleLinear()
      .domain([minYRange ?? 0, maxYRange ?? 0])
      .range([height - margin.bottom, margin.top])
      .nice();
    const xAxis = d3.axisBottom(xScale);
    // eslint-disable-next-line @typescript-eslint/no-base-to-string
    const yAxis = d3.axisLeft(yScale).tickFormat((d) => `$${d.toString()}`);

    const xValues = [0, ...data.map((datum) => datum.x)];

    // Add the rectangles
    svg
      .selectAll('rect')
      .data(sortData(data))
      .join('rect')
      .attr('class', 'bar')
      .attr('x', (d, i) => {
        // X position is the sum of the previous values
        const values = xValues.map((_value, index) =>
          xValues.slice(0, index + 1).reduce((a, b) => a + b),
        );
        return xScale(values[i]);
      })
      .attr('y', (d) => {
        return d.y >= 0 ? yScale(d.y) : yScale(0);
      })
      .attr('width', (d) => xScale(d.x) - margin.left)
      .attr('height', (d) => {
        return Math.abs(yScale(0) - yScale(d.y));
      })
      .attr('fill', (d, i) => {
        return getColor(i);
      });

    // append the x axis
    svg
      .append('g')
      .attr('transform', `translate(0, ${height - margin.bottom})`)
      .call(xAxis)
      .selectAll('text')
      .style('text-anchor', 'middle');

    // append the y axis
    svg.append('g').attr('transform', `translate(${margin.left},0)`).call(yAxis);

    // add the x axis label
    svg
      .append('text')
      .attr('class', 'axis-label')
      .attr('x', margin.left)
      .attr('y', 0)
      .attr('dy', '1em')
      .attr('dx', '-4.5em')
      .text('$/tCO₂e abated');

    // add the y axis label
    svg
      .append('text')
      .attr('class', 'axis-label')
      .attr('x', width - margin.right)
      .attr('y', height - margin.bottom / 2)
      .attr('dy', '.5em')
      .attr('dx', '-4.5em')
      .text('tCO₂e abated');

    // add legend
    const legend = svg
      .append('g')
      .attr('class', 'legend')
      .attr('transform', `translate(${margin.left},${height - margin.bottom + 30})`);

    legend
      .selectAll('.legend-item')
      .data(data)
      .join('g')
      .attr('class', 'legend-item')
      .attr('transform', (d, i) => `translate(${i * 100}, 0)`);

    legend
      .selectAll('.legend-item')
      .append('rect')
      .attr('x', 0)
      .attr('y', 0)
      .attr('width', 18)
      .attr('height', 18)
      .attr('fill', (d, i) => getColor(i));

    legend
      .selectAll('.legend-item')
      .data(data)
      .append('text')
      .attr('x', 24)
      .attr('y', 9)
      .attr('dy', '.35em')
      .text((d) => d.name);
  };

  return <div ref={containerRef}></div>;
};
