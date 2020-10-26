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
      svg.setAttribute("style", "width:25px;height:25px;stroke:#ffffff;");
    }}
  />
);

const Button = ({
  text,
  onClick,
  solid = true,
  text_size = "text-lg",
  color = " bg-betterfit-basic-blue",
  hoverColor = "bg-betterfit-darker-blue",
  type="submit"
}) => {
  let css_add_on = solid
    ? "text-white hover:" + hoverColor + " " + color
    : "text-betterfit-betterfit-navy bg-transparent border border-betterfit-grey";
  return (
    <span className="block w-full shadow-sm flex items-baseline">
      <button
        onClick={onClick}
        type={type}
        className={
          css_add_on +
          " rounded-md w-full flex justify-center py-3 border border-transparent font-semibold " +
          " focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 " +
          " transition duration-150 ease-in-out capitalize " +
          text_size
        }
      >
        {text}
      </button>
    </span>
  );
};

export default Button;
