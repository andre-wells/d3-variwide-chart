import './App.css';
import BarChartSimple from './components/BarChartSimple';
import BarChartWithScale from './components/BarChartWithScale';
import LineGraph from './components/LineGraph';
import VaribleWidthBarChart from './components/VaribleWidthBarChart';
import VaribleWidthBarChartV2 from './components/VaribleWidthBarChartV2';

function App() {
  return (
    <div className='chart-box'>
      <h1>D3</h1>

      <h2>Sample Line Graph</h2>
      <LineGraph />

      <h2>Sample Bar Chart </h2>
      <BarChartSimple />

      <h2>Sample Bar Chart with Scale </h2>
      <BarChartWithScale />

      <h2>Variable Width Bar Chart Final</h2>
      <VaribleWidthBarChartV2 />

      <h2>Variable Width Bar Chart Sample</h2>
      <VaribleWidthBarChart
        margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
        svgWidth={500}
        svgHeight={200}
      />
    </div>
  );
}

export default App;
