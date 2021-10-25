import clsx from "clsx";
import React from "react";

export interface TitleProps {
  children?: React.ReactNode;
  extraClasses?: string;
}
const Title = ({ children, extraClasses }: TitleProps) => {
  return (
    <h1
      className={clsx(
        "text-betterfit-graphite text-xl md:text-2xl lg:text-3xl text-center w-full mb-2",
        extraClasses
      )}
    >
      {children}
    </h1>
  );
};

export default Title;
