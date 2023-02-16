import './App.css';
import BarChartWithScale from './components/BarChartWithScale';
import { VaribleWidthBarChart } from './components/VaribleWidthBarChart';
import { unSortedData } from './data/testData';

function App() {
  return (
    <div className='chart-box'>
      <h1>D3</h1>

      <h2>Sample Bar Chart with Scale </h2>
      <BarChartWithScale />

      <h2>Variable Width Bar Chart</h2>
      <VaribleWidthBarChart
        width={960}
        height={500}
        scaleTickFactor={20}
        margin={{ top: 20, right: 30, bottom: 55, left: 70 }}
        data={unSortedData}
      />
    </div>
  );
}

export default App;
