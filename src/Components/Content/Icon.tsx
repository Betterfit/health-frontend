import clsx from "clsx";
import React from "react";

const Icon = ({
  name,
  extraClasses,
  size,
}: {
  name: string;
  extraClasses?: string;
  size?: keyof typeof sizes;
}) => {
  return (
    <span
      className={clsx("material-icons-outlined", extraClasses)}
      style={{ fontSize: size && sizes[size] }}
    >
      {name}
    </span>
  );
};

const sizes = {
  small: "20px",
  medium: "32px",
  large: "50px",
};

export default Icon;
