import React from "react";
import ReactTooltip from "react-tooltip";

interface TooltipProps {
  text: string;
  identifier: string;
}
const Tooltip = ({ text, identifier }: TooltipProps) => {
  return (
    <>
      <p data-tip data-for={identifier} className="text-sm font-bold">
        ?
      </p>
      <ReactTooltip id={identifier}>
        <p className="text-white text-sm whitespace-pre">{text}</p>
      </ReactTooltip>
    </>
  );
};

export default Tooltip;
