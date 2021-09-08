import Translator from "Helpers/Translator";
import React from "react";
import { NavLink } from "react-router-dom";
import { ReactSVG } from "react-svg";

const SideBarNavigation = ({ navList }) => {
  return (
    <nav className="flex-1 flex-row md:flex-col flex-wrap flex md:block justify-around items-baseline sm:space-y-4 md:my-8 px-4 text-light-text">
      {navList.map((navItem) => {
        return (
          <div key={`menu_item_${navItem.key}`}>
            <NavLink
              className="mt-0 block nav opacity-75 flex flex-col sm:flex-row items-center rounded py-1"
              activeStyle={{
                backgroundColor: "rgba(0,0,0,0.3)",
                color: "white",
              }}
              to={navItem.to}
            >
              <ReactSVG
                src={navItem.icon}
                className=" text-white sm:p-3"
                beforeInjection={(svg) => {
                  svg.setAttribute("style", "width: 24px;height:24px");
                }}
              />
              <span className="group flex items-center text-10 sm:text-sm leading-5 font-medium sm:text-xl font-body text-white">
                {Translator(navItem.name)}
              </span>
            </NavLink>
          </div>
        );
      })}
    </nav>
  );
};

export default SideBarNavigation;
