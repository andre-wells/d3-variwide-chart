import * as d3 from 'd3';
import React, { useEffect } from 'react';
import { type IMargin } from '../models/margin';
import { clearSvg, createSvg } from '../utils/svg';

// Width and height
const width = 960;
const height = 500;
const margin: IMargin = { top: 20, right: 30, bottom: 55, left: 70 };
const CONTAINER_ID = 'svg-bar-chart-scale-container';
const SVG_ID = 'svg-bar-chart-scale';

const BarChartWithScale = () => {
  useEffect(() => {
    let ignore = false;

    const fetchData = async () => {
      const data = await d3.json('./src/data/nigeria-states.json');
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

  const Populate = (data: unknown) => {
    const svg = createSvg(`#${CONTAINER_ID}`, SVG_ID, width, height);

    const svg2 = d3.select(`#${CONTAINER_ID}`).attr('viewBox', [0, 0, width, height]);

    // defines the position and dimension, in user space, of an SVG viewport.
    // Basically, the viewbox of the svg are our dimentions.
    // svg.attr('viewBox', [0, 0, width, height]);

    // Assign d.Population to the number of d.info.Population
    data.forEach((d) => (d.Population = +d.info.Population));

    // Set the domain of our scales.
    // Adjust the range to sit within our margines. We need the margins to show the axis for labels etc.
    const xScale = d3
      .scaleBand()
      .range([margin.left, width - margin.right])
      .padding(0.1); // 'band' is essentially categories
    const yScale = d3.scaleLinear().range([height - margin.bottom, margin.top]);

    // The x scale is a band scale so we set the domain to the name of states (36 states)
    xScale.domain(data.map((d) => d.Name));
    // The y scale is a linear scale so we set the minimum value to 0. And rather than setting the maximum value ourselves, we let D3 do that for us by using the d3.max() method.
    yScale.domain([0, d3.max(data, (d) => d.Population)]);

    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);

    // Lastly we need to add the rectangles so we can see our bar chart:
    // HOWEVER: After adding margins, we need to shift things.
    svg
      .selectAll('rect')
      .data(data)
      .join('rect')
      .attr('class', 'bar')
      .attr('x', (d) => xScale(d.Name))
      .attr('y', (d) => yScale(d.Population))
      .attr('width', xScale.bandwidth())
      .attr('height', (d) => height - margin.bottom - yScale(d.Population));

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

export default BarChartWithScale;
