export const getColor = (index: number): string => {
  const colors = blueToOrangePalette;
  const colorIndex = index % colors.length;
  return colors[colorIndex];
};

const blueToOrangePalette = ['#0570b0', '#74a9cf', '#bdc9e1', '#fdae61', '#f46d43', '#a50026'];
