import Expand from "Images/Icons/expand.svg";
import React, { useState } from "react";
import { ReactSVG } from "react-svg";

const Collapsible = ({ heading, children, onClickEvent }) => {
  const [isOpen, setIsOpen] = useState(false);

  const collapsibleChangeIsOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className="cursor-pointer bg-gray-300 w-6/12 rounded flex flex-col items-start justify-center p-2 border-2 border-white hover:bg-gray-400"
      onClick={collapsibleChangeIsOpen}
    >
      <div className="w-full flex flex-row justify-between m-1 px-4">
        <button className="text-betterfit-graphite text-sm">{heading}</button>
        <ReactSVG
          className={isOpen ? "transform rotate-180" : "transform rotate-0"}
          src={Expand}
          beforeInjection={(svg) => {
            svg.setAttribute("style", "width: 22px");
          }}
        />
      </div>
      {isOpen && (
        <div className="h-32 overflow-y-scroll overflow-x-hidden">
          <div className="rounded relative z-20border-transparent">
            <div className="bg-white">
              {children.map((region, i) => {
                return (
                  <button
                    key={i}
                    className="graph__collapsible text-betterfit-grey-blue text-sm mx-1 text-left w-full px-2 hover:text-betterfit-basic-blue hover:font-extrabold"
                    onClick={(e) => onClickEvent(e, heading, region)}
                  >
                    {region}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Collapsible;
