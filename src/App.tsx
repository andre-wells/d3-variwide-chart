import './App.css';
import BarChartSimple from './components/BarChartSimple';
import LineGraph from './components/LineGraph';
import VaribleWidthBarChart from './components/VaribleWidthBarChart';

function App() {
  return (
    <div className='chart-box'>
      <h1>D3</h1>

      <h2>Sample Line Graph</h2>
      <LineGraph />

      <h2>Sample Bar Chart </h2>
      <BarChartSimple />

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
