import { Group } from "@visx/group";
import { LinearGradient } from "@visx/gradient";
import { scaleBand, scaleLinear } from "@visx/scale";
import { AxisLeft, AxisBottom } from "@visx/axis";

// accessors return the label and value of that data item
const x = (d) => d.month;
const y = (d) => d.value;

function Bar({ data, width, height }) {
  // bounds
  const xMax = width - 80;
  const yMax = height - 80;

  // scales
  const xScale = scaleBand({
    rangeRound: [0, xMax],
    domain: data.map(x),
    padding: 0.4,
  });

  const yScale = scaleLinear({
    rangeRound: [0, yMax],
    domain: [Math.max(...data.map(y)), 0],
  });

  return (
    <svg width={width} height={height}>
      <Group top={25} left={55}>
        <AxisLeft
          left={10}
          scale={yScale}
          numTicks={4}
          label="Number of Posts"
        />
        <AxisBottom scale={xScale} label="Month" labelOffset={15} top={yMax} />
      </Group>
    </svg>
  );
}

export default Bar;
