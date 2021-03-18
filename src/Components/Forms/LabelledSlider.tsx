import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import React from "react";

interface LabelledSliderProps {
  value: number;
  label: string;
  onChange: (val: number) => void;
  showMarks?: boolean;
  numDecimals?: number;
}
const LabelledSlider = ({
  value,
  label,
  onChange,
  showMarks = false,
  numDecimals = 0,
}: LabelledSliderProps) => (
  <div>
    <div className="flex justify-between">
      <label id="LabelledSlider">{label}</label>
      <span>
        <input
          type="number"
          value={value.toFixed(numDecimals)}
          onChange={(e) => onChange(parseInt(e.target.value))}
          className="w-12 ml-auto bg-transparent"
          max={100}
          min={0}
        />
        %
      </span>
    </div>
    <Slider
      value={value}
      onChange={onChange}
      marks={showMarks ? sliderMarks : undefined}
      className="mb-5 text-flow-white"
      ariaLabelledByForHandle="LabelledSlider"
      handleStyle={{ borderColor: "#61C1BA", backgroundColor: " #61C1BA" }}
    />
  </div>
);

// sliderMarks looks like this
// {
//   75: {
//     style: {
//       color: "#B4EFEF",
//     },
//     label: "75%",
//   },
// };

const sliderMarks = [0, 50, 100].reduce<Record<number, any>>((acc, val) => {
  acc[val] = {
    style: { color: "#1F5C66" },
    label: `${val}%`,
  };
  return acc;
}, {});

export default LabelledSlider;
