import { useQuery, gql } from "@apollo/client";
import { Bar } from "@visx/shape";
import { Group } from "@visx/group";
import { scaleBand, scaleLinear } from "@visx/scale";
import { AxisLeft, AxisBottom } from "@visx/axis";
import { GradientTealBlue } from "@visx/gradient";
import "./histogram.css";

const POSTS = gql`
  query getPosts {
    allPosts(count: 50) {
      id
      createdAt
    }
  }
`;

const x = (data) => data.month;
const y = (data) => data.value;

const verticalMargin = 120;

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
  const xMax = 1000;
  const yMax = height - verticalMargin;

  // scales
  const xScale = scaleBand({
    range: [0, xMax],
    round: true,
    domain: histogramData.map(x),
    padding: 0.5,
  });

  const yScale = scaleLinear({
    range: [yMax, 0],
    round: true,
    domain: [0, Math.max(...histogramData.map(y))],
  });

  return (
    <svg width={width} height={height}>
      <GradientTealBlue id="teal" />
      <rect width={width} height={height} fill="url(#teal)" rx={14} />
      <Group top={verticalMargin / 2} left={60}>
        <AxisLeft
          left={10}
          scale={yScale}
          numTicks={7}
          label="Number of Posts"
        />
        {histogramData.map((d) => {
          const month = x(d);
          const barWidth = 50;
          const barHeight = yMax - (yScale(y(d)) ?? 0);
          const barX = xScale(month);
          const barY = yMax - barHeight;
          return (
            <Bar
              key={`bar-${month}`}
              x={barX}
              y={barY}
              width={barWidth}
              height={barHeight}
              fill="rgba(23, 233, 217, .5)"
            />
          );
        })}
        <AxisBottom scale={xScale} label="Month" labelOffset={15} top={yMax} />
      </Group>
    </svg>
  );
};

export default Histogram;
