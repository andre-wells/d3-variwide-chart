import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const sampleData = [
  { date: new Date('2020-01-01'), value: 50 },
  { date: new Date('2020-02-01'), value: 70 },
  { date: new Date('2020-03-01'), value: 60 },
  { date: new Date('2020-04-01'), value: 55 },
  { date: new Date('2020-05-01'), value: 75 },
];

const LineGraph = () => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = d3.select(svgRef.current);

    const xScale = d3
      .scaleTime()
      .domain(d3.extent(sampleData, (d) => d.date))
      .range([0, 500]);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(sampleData, (d) => d.value)])
      .range([500, 0]);

    const lineGenerator = d3
      .line()
      .x((d) => xScale(d.date))
      .y((d) => yScale(d.value));

    svg
      .append('path')
      .attr('d', lineGenerator(sampleData))
      .attr('fill', 'none')
      .attr('stroke', 'blue');

    svg.append('g').attr('transform', `translate(0, ${500})`).call(d3.axisBottom(xScale));

    svg.append('g').call(d3.axisLeft(yScale));
  }, []);

  return (
    <svg width={500} height={200} ref={svgRef}>
      {/* This is where the graph will be displayed */}
    </svg>
  );
};

export default LineGraph;
