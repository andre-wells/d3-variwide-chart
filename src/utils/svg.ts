import { select } from 'd3';

export const clearSvg = (selector: string) => {
  return select(selector).remove();
};
