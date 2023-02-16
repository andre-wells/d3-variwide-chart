export const getColor = (index: number): string => {
  const colorIndex = index % colorPalette.length;
  return blueToOrangePalette[colorIndex];
};

const colorPalette = [
  '#1f77b4', // muted blue
  '#ff7f0e', // safety orange
  '#2ca02c', // cooked asparagus green
  '#d62728', // brick red
  '#9467bd', // muted purple
  '#8c564b', // chestnut brown
  '#e377c2', // raspberry yogurt pink
  '#7f7f7f', // middle gray
  '#bcbd22', // curry yellow-green
  '#17becf', // blue-teal
  '#FDB813', // sunflower yellow
  '#ED1C24', // tomato red
];

const blueToOrangePalette = ['#0570b0', '#74a9cf', '#bdc9e1', '#fdae61', '#f46d43', '#a50026'];
