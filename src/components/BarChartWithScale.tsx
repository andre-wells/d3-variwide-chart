import * as d3 from 'd3';
import React, { useEffect } from 'react';
import { clearSvg, createSvg } from '../utils/svg';

// Width and height
const width = 960;
const height = 500;
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

    // Assign d.Population to the number of d.info.Population
    data.forEach((d) => (d.Population = +d.info.Population));

    // Set the domain of our scales.
    const xScale = d3.scaleBand().range([0, width]); // 'band' is essentially categories
    const yScale = d3.scaleLinear().range([height, 0]);

    // The x scale is a band scale so we set the domain to the name of states (36 states)
    xScale.domain(data.map((d) => d.Name));
    // The y scale is a linear scale so we set the minimum value to 0. And rather than setting the maximum value ourselves, we let D3 do that for us by using the d3.max() method.
    yScale.domain([0, d3.max(data, (d) => d.Population)]);

    // Lastly we need to add the rectangles so we can see our bar chart:
    svg
      .selectAll('rect')
      .data(data)
      .join('rect')
      .attr('class', 'bar')
      .attr('x', (d) => xScale(d.Name))
      .attr('y', (d) => yScale(d.Population))
      .attr('width', xScale.bandwidth())
      .attr('height', (d) => height - yScale(d.Population));
  };

  return <div id={CONTAINER_ID}></div>;
};

export default BarChartWithScale;
