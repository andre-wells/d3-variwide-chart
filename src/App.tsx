import './App.css';
import BarChartWithScale from './components/BarChartWithScale';
import { VaribleWidthBarChart } from './components/VaribleWidthBarChart';
import { type Datum } from './components/VaribleWidthBarChart/models';

const data: Datum[] = [
  {
    name: 'Example 1',
    y: -193.36,
    x: 21.6,
  },
  {
    name: 'Example 2',
    y: 16.16,
    x: 275.48,
  },
  {
    name: 'Example 3',
    y: 42,
    x: 40,
  },
];

const sortedData: Datum[] = [
  {
    name: 'Example 1',
    y: -193.36,
    x: 21.6,
  },
  {
    name: 'Example 2',
    y: -125,
    x: 2000,
  },
  {
    name: 'Example 3',
    y: 25,
    x: 100,
  },
  {
    name: 'Example 4',
    y: 32,
    x: 1500,
  },
  {
    name: 'Example 5',
    y: 75,
    x: 6000,
  },
  {
    name: 'Example 6',
    y: 135,
    x: 100,
  },
];

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
        data={sortedData}
      />
    </div>
  );
}

export default App;
