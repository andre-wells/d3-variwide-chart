import { useEffect } from 'react';
import { clearSvg, createSvg } from '../utils/svg';

const CONTAINER_ID = 'svg-simple-bar-chart-container';
const SVG_ID = 'svg-simple-bar-chart';

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
    // Create SVG element

    const svg = createSvg(`#${CONTAINER_ID}`, SVG_ID, w, h);

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

  return <div id={CONTAINER_ID}></div>;
};

export default BarChartSimple;
