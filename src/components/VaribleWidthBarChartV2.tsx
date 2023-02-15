import * as d3 from 'd3';
import React, { useEffect } from 'react';
import { type Datum } from '../models/datum';
import { type IMargin } from '../models/margin';
import { getMaxRange, getMinRange } from '../utils/scales';
import { clearSvg, createSvg } from '../utils/svg';

const width = 960;
const height = 500;
const margin: IMargin = { top: 20, right: 30, bottom: 55, left: 70 };
const CONTAINER_ID = 'svg-variwide-bar-chart-container';
const SVG_ID = 'svg-variwide-bar-chart';

const data: Datum[] = [
  {
    name: 'Example 1',
    y: -196.36,
    z: 21.6,
  },
  {
    name: 'Example 2',
    y: 21.6,
    z: 275.48,
  },
];

const VaribleWidthBarChartV2 = () => {
  useEffect(() => {
    let ignore = false;

    const fetchData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 200)); // Simulate a data fetch
      if (!ignore) {
        clearSvg(`#${SVG_ID}`);
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
    const svg = createSvg(`#${CONTAINER_ID}`, SVG_ID, width, height);

    const minRange = getMinRange(data, (d) => d.y, 50);
    const maxRange = getMaxRange(data, (d) => d.y, 50);

    const xScale = d3
      .scaleBand()
      .range([margin.left, width - margin.right])
      .domain(data.map((d) => d.name));

    const yScale = d3
      .scaleLinear()
      .range([height - margin.bottom, margin.top])
      .domain([minRange as number, maxRange as number]);

    // xScale.domain(data.map((d) => d.name));
    // yScale.domain([0, d3.max(data, (d) => d.y) as number]);

    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);

    // Lastly we need to add the rectangles so we can see our bar chart:
    svg
      .selectAll('rect')
      .data(data)
      .join('rect')
      .attr('class', 'bar')
      .attr('x', (d) => xScale(d.name) as number)
      .attr('y', (d) => yScale(d.y))
      .attr('width', xScale.bandwidth())
      .attr('height', (d) => height - margin.bottom - yScale(d.y));

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

  return <div id={CONTAINER_ID}></div>;
};

export default VaribleWidthBarChartV2;
