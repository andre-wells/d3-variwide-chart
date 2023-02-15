import { useEffect } from 'react';
import * as d3 from 'd3';
import { clearSvg, createSvgGroup } from '../utils/svg';
import { type IMargin } from '../models/margin';
import { linearScale } from '../utils/scales';
import { createXAxis, createYAxis } from '../utils/axes';

const CONTAINER_ID = 'svg-variable-width-bar-chart-container';
const SVG_ID = 'svg-variable-width-bar-chart';

const data = [
  {
    valueY: 10,
    valueX: 10,
    color: '#68d391',
  },
  {
    valueY: 20,
    valueX: 5,
    color: '#48bb78',
  },
  {
    valueY: 30,
    valueX: 3,
    color: '#38a169',
  },
];

interface IProps {
  margin: IMargin;
  svgWidth: number;
  svgHeight: number;
}

const VaribleWidthBarChart = (props: IProps) => {
  const { svgWidth, svgHeight, margin } = props;

  useEffect(() => {
    clearSvg(`#${SVG_ID}`);
    populate();
  }, [svgWidth, svgHeight, margin]);

  const populate = () => {
    const width = svgWidth - margin.left - margin.right;
    const height = svgHeight - margin.top - margin.bottom;

    // Create SVG element
    const svg = d3
      .select(`#${CONTAINER_ID}`)
      .append('svg')
      .attr('id', SVG_ID)
      .attr('width', svgWidth)
      .attr('height', svgHeight);

    const group = createSvgGroup(svg, margin);
    const x = linearScale([0, width]);
    const y = linearScale([height, 0]);

    const xScaleValue = data.reduce((acc, curr) => {
      return acc + curr.valueX;
    }, 0);

    const yScaleValue = data.map((datum) => datum.valueY);

    x.domain([0, xScaleValue]);
    y.domain([0, d3.max(yScaleValue)]);

    // X axis
    createXAxis(group, height, x);
    // Y axis
    createYAxis(group, y);

    group
      .selectAll('bar')
      .data(data)
      .enter()
      .append('rect')
      .attr('fill', (datum) => datum.color)
      .attr('x', function (datum, i) {
        const xValues = data.map((datum) => datum.valueX);
        let values = [0, ...xValues];
        values = values.map((value, index) => values.slice(0, index + 1).reduce((a, b) => a + b));
        return x(values[i]);
      })
      .attr('width', (datum) => x(datum.valueX))
      .attr('y', function (datum) {
        return y(datum.valueY);
      })
      .attr('height', function (datum) {
        return height - y(datum.valueY);
      });
  };

  return (
    <>
      <div id={CONTAINER_ID}></div>
    </>
  );
};

export default VaribleWidthBarChart;
