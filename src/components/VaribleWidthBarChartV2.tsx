import * as d3 from 'd3';
import { useEffect, useRef } from 'react';
import { type Datum } from '../models/datum';
import { type IMargin } from '../models/margin';
import { getMaxRange, getMinRange } from '../utils/scales';

const scaleTickFactor = 10;
const width = 960;
const height = 500;
const margin: IMargin = { top: 20, right: 30, bottom: 55, left: 70 };

const data: Datum[] = [
  {
    name: 'Example 1',
    y: -14.36,
    z: 21.6,
  },
  {
    name: 'Example 2',
    y: 21.6,
    z: 275.48,
  },
  {
    name: 'Example 3',
    y: 1,
    z: 275.48,
  },
];

const VaribleWidthBarChartV2 = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ignore = false;

    const fetchData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 200)); // Simulate a data fetch
      if (!ignore) {
        Populate(data);
      }
      return data;
    };

    void fetchData();

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
    const minYRange = getMinRange(data, (d) => d.y, scaleTickFactor);
    const maxYRange = getMaxRange(data, (d) => d.y, scaleTickFactor);

    // const xScaleValue = data.reduce((acc, curr) => {
    //   return acc + curr.z;
    // }, 0);
    // console.log('sum of z values to apply to x a scale', xScaleValue);
    // const maxXRange = getMaxRangeFromValue(xScaleValue, scaleTickFactor);
    // console.log('maxXRange', maxXRange);

    // Define scales
    const xScale = d3
      .scaleBand()
      .domain(data.map((d) => d.name))
      .range([margin.left, width - margin.right])
      .padding(0.1);

    const yScale = d3
      .scaleLinear()
      .domain([minYRange as number, maxYRange as number])
      .range([height - margin.bottom, margin.top]);
    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);

    // Add the rectangles
    svg
      .selectAll('rect')
      .data(data)
      .join('rect')
      .attr('class', 'bar')
      .attr('x', (d) => xScale(d.name) ?? 0)
      .attr('y', (d) => {
        return d.y >= 0 ? yScale(d.y) : yScale(0);
      })
      .attr('width', xScale.bandwidth())
      .attr('height', (d) => {
        return Math.abs(yScale(0) - yScale(d.y));
      })
      .attr('fill', (d, i) => {
        return i % 2 === 0 ? 'steelblue' : 'firebrick';
      });

    // append x axis
    svg
      .append('g')
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .call(xAxis)
      .selectAll('text') // everything from this point is optional
      .style('text-anchor', 'end')
      .attr('dx', '-.8em')
      .attr('dy', '.15em')
      .attr('transform', 'rotate(-65)');

    // append the y axis
    svg.append('g').attr('transform', `translate(${margin.left},0)`).call(yAxis);
  };

  return <div ref={containerRef}></div>;
};

export default VaribleWidthBarChartV2;
