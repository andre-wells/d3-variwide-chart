import * as d3 from 'd3';
import React, { useEffect } from 'react';
import { clearSvg, createSvg } from '../utils/svg';

// Width and height
const w = 960;
const h = 500;
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
    const svg = createSvg(`#${CONTAINER_ID}`, SVG_ID, w, h);

    // Assign d.Population to the number of d.info.Population
    data.forEach((d) => (d.Population = +d.info.Population));

    // Set the domain of our scales.
  };

  return <div id={CONTAINER_ID}></div>;
};

export default BarChartWithScale;
