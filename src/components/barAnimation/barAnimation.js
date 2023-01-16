import { GET_MONTH_VALUE } from "../../utils/constants";

const BarAnimation = ({ d, yScale, barMaxHeight, barHeight }) => {
  return (
    <>
      <animate
        attributeName="y"
        to={yScale(GET_MONTH_VALUE(d))}
        from={barMaxHeight}
        dur="1s"
      ></animate>
      <animate
        attributeName="height"
        to={barHeight}
        from={0}
        dur="1s"
      ></animate>
    </>
  );
};

export default BarAnimation;
