import { useEffect } from 'react';
import * as d3 from 'd3';
import { clearSvg } from '../utils/svg';

const SVG_ID = 'svg-chart';

const dataset = [5, 10, 13, 19, 21, 25, 22, 18, 15, 13, 11, 12, 15, 20, 18, 17, 16, 18, 23, 25];

// Width and height
const w = 500;
const h = 100;

const BarChartSimple = () => {
  useEffect(() => {
    clearSvg(`#${SVG_ID}`);
    populate();
  }, []);

  const populate = () => {
    console.log('populate');
    // Create SVG element
    const svg = d3
      .select('#chartContainer')
      .append('svg')
      .attr('id', SVG_ID)
      .attr('width', w)
      .attr('height', h);

    // Populate bars
    svg
      .selectAll('rect')
      .data(dataset)
      .enter()
      .append('rect')
      .attr('x', (d: number, i: number) => i * 21)
      .attr('y', 0)
      .attr('width', 20)
      .attr('height', 100);
  };

  return <div id='chartContainer'></div>;
};

export default BarChartSimple;
