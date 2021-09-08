import React from "react";

const Icon = ({
  name,
  extraClasses,
}: {
  name: string;
  extraClasses?: string;
}) => {
  return (
    <span className={"material-icons-outlined " + extraClasses}>{name}</span>
  );
};

const sizes = {
  small: "20px",
  medium: "32px",
  large: "50px",
};

export default Icon;
