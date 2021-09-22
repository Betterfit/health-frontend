import clsx from "clsx";
import React from "react";

export interface TitleProps {
  text: string;
  extraClasses?: string;
}
const Title = ({ text, extraClasses }: TitleProps) => {
  return (
    <h1
      className={clsx(
        "text-betterfit-graphite text-xl md:text-2xl lg:text-3xl text-center w-full mb-2",
        extraClasses
      )}
    >
      {text}
    </h1>
  );
};

export default Title;
