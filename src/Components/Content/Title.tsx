import React from "react";

export interface TitleProps {
  text: string;
}
const Title = ({ text }: TitleProps) => {
  return (
    <span className="text-betterfit-graphite text-xl md:text-2xl lg:text-3xl">
      {text}
    </span>
  );
};

export default Title;
