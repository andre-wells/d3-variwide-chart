import './App.css';
import BarChartSimple from './components/BarChartSimple';
import LineGraph from './components/LineGraph';

function App() {
  return (
    <div className='chart-box'>
      <h1>D3</h1>

      <h2>Sample Line Graph</h2>
      <LineGraph />

      <h2>Sample Bar Chart </h2>
      <BarChartSimple />
    </div>
  );
}

export default App;
