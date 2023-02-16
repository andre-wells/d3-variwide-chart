import './App.css';
import BarChartWithScale from './components/BarChartWithScale';
import { VaribleWidthBarChart } from './components/VaribleWidthBarChart';

function App() {
  return (
    <div className='chart-box'>
      <h1>D3</h1>

      <h2>Sample Bar Chart with Scale </h2>
      <BarChartWithScale />

      <h2>Variable Width Bar Chart</h2>
      <VaribleWidthBarChart />
    </div>
  );
}

export default App;
