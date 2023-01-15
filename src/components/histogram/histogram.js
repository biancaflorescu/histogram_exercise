import { useQuery } from "@apollo/client";
import { Bar } from "@visx/shape";
import { Group } from "@visx/group";
import { AxisLeft, AxisBottom } from "@visx/axis";
import {
  POSTS,
  GET_MONTH,
  GET_MONTH_VALUE,
  VERTICAL_MARGIN,
} from "../../utils/constants";
import { boundsHistogram, scalesHistogram } from "../../utils/helper_functions";
import "./histogram.css";

const Histogram = ({ width, height }) => {
  const { loading, error, data } = useQuery(POSTS);

  if (loading) return "Loading...";

  if (error) return `Error! ${error.message}`;

  const monthsCounter = {
    Jan: 0,
    Feb: 0,
    Mar: 0,
    Apr: 0,
    May: 0,
    Jun: 0,
    Jul: 0,
    Aug: 0,
    Sep: 0,
    Oct: 0,
    Nov: 0,
    Dec: 0,
  };

  data.allPosts.map((post) => {
    const date = new Date(Number(post.createdAt));

    if (date.getFullYear() === 2019) {
      const month = date.toLocaleString("en-US", { month: "short" });
      if (monthsCounter.hasOwnProperty(month)) {
        monthsCounter[month]++;
      }
    }
  });

  const histogramData = Object.entries(monthsCounter).map((arr) => {
    return {
      month: arr[0],
      value: arr[1],
    };
  });

  // bounds
  const { xMax, yMax } = boundsHistogram(height);

  // scales
  const { xScale, yScale } = scalesHistogram(xMax, yMax, histogramData);

  return (
    <svg width={width} height={height}>
      <linearGradient id="primaryBar" gradientTransform="rotate(90)">
        <stop offset="5%" stop-color="rgba(17,242,202,1)" />
        <stop offset="95%" stop-color="rgba(7,173,243,1)" />
      </linearGradient>
      <linearGradient id="secondBar" gradientTransform="rotate(90)">
        <stop offset="5%" stop-color="rgba(25,53,100,1)" />
        <stop offset="95%" stop-color="rgba(17,93,183,1)" />
      </linearGradient>
      <Group top={VERTICAL_MARGIN / 2} left={60}>
        {/* <AxisLeft left={10} scale={yScale} numTicks={7} /> */}
        {histogramData.map((d) => {
          const month = GET_MONTH(d);
          const barWidth = 50;
          const barHeight = yMax - (yScale(GET_MONTH_VALUE(d)) ?? 0);
          const barMaxHeight = yMax;
          const barX = xScale(month);
          const barY = yMax - barHeight;
          const barMaxY = yMax - barMaxHeight;
          return (
            <>
              <Bar
                key={`barMax-${month}`}
                x={barX}
                y={barMaxY}
                width={barWidth}
                height={barMaxHeight}
                fill="url('#secondBar')"
              />
              <Bar
                key={`bar-${month}`}
                x={barX}
                y={barY}
                width={barWidth}
                height={barHeight}
                fill="url('#primaryBar')"
              />
              <text
                x={d.value.toString().length === 1 ? barX + 20 : barX + 15}
                y={barY + 20}
                fill="#193564"
              >
                {d.value}
              </text>
            </>
          );
        })}
        <AxisBottom scale={xScale} labelOffset={15} top={yMax} />
      </Group>
    </svg>
  );
};

export default Histogram;
