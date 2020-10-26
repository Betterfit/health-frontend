import React from "react";

const ControllerCardStatus = ({
  value,
  textStyle,
  background,
  left = true,
}) => {
  const rounded = left ? "rounded-l-full" : "rounded-r-full";
  return (
    <div
      className={`uppercase py-2 px-3 text-xs ${background} ${textStyle} ${rounded}`}
    >
      {value}
    </div>
  );
};

export default ControllerCardStatus;
