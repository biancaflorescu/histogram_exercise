import { scaleBand, scaleLinear } from "@visx/scale";
import { GET_MONTH, GET_MONTH_VALUE, VERTICAL_MARGIN } from "./constants";

const boundsHistogram = (height) => {
  return {
    xMax: 1000,
    yMax: height - VERTICAL_MARGIN,
  };
};

const scalesHistogram = (xMax, yMax, data) => {
  return {
    xScale: scaleBand({
      range: [0, xMax],
      round: true,
      domain: data.map(GET_MONTH),
      padding: 0.5,
    }),
    yScale: scaleLinear({
      range: [yMax, 0],
      round: true,
      domain: [0, Math.max(...data.map(GET_MONTH_VALUE))],
    }),
  };
};

export { boundsHistogram, scalesHistogram };
