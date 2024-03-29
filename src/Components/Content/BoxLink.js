import RightArrow from "Images/Icons/right-arrow.svg";
import React from "react";
import { NavLink } from "react-router-dom";
import { ReactSVG } from "react-svg";
const BoxLink = ({ textColor, link, to }) => {
  return (
    <NavLink
      to={to}
      className={`text-${textColor} pl-4 pr-2 py-5 flex justify-between bg-white rounded-md box-link font-semibold`}
    >
      {link}
      <ReactSVG
        src={RightArrow}
        className="flex items-center opacity-25"
        beforeInjection={(svg) => {
          svg.setAttribute("style", "width: 16px;margin-left:15px;");
        }}
      />
    </NavLink>
  );
};

export default BoxLink;
