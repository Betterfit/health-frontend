import React from "react";
import { ReactSVG } from "react-svg";
import Plus from "Images/Icons/plus.svg";
import Edit from "Images/Icons/edit.svg";
//To add an svg icon - add component to svg and add to svgMap
//So if svgName = 'plus' will call the Plus component


const PlusButton = () => (
  <ReactSVG
  src={Plus}
  className=" px-2"
  beforeInjection={(svg) => {
    svg.setAttribute(
      "style",
      "width:25px;height:25px;stroke:#ffffff;",
    );
  }}
  />
);

const Button = ({ text, svgName, onClick }) => {

  const svgSwitch = (svgType) => {
    switch(svgType) {
      case 'plus':
        return <PlusButton/>
      default:
        return null;
    }
  }

  return (
    <span className="block w-full shadow-sm flex items-baseline">
      <button
        onClick = {onClick}
        type="submit"
        className="rounded w-full flex justify-center py-2 border border-transparent text-lg font-semibold text-white bg-basic-blue hover:bg-darker-blue focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out uppercase"
      >
        <span>{text}</span>
        { svgSwitch(svgName) }
  
      </button>
    </span>
  );
};

export default Button;
