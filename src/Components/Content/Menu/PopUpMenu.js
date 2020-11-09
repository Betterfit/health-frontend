import React, { useState } from "react";
import { Transition } from "@tailwindui/react";
import { ReactSVG } from "react-svg";

import DotMenu from "Images/Icons/dot-menu.svg";

export const PopUpMenu = ({ children }) => {
  const [ShowOpt, SetOptions] = useState(false);
  const ToggleOptions = () => {
    SetOptions(!ShowOpt);
  };
  return (
    <>
      <ReactSVG
        src={DotMenu}
        onClick={ToggleOptions}
        className="text-white opacity-50 pl-2"
        beforeInjection={(svg) => {
          svg.setAttribute("style", "width: 18px;height:18px");
        }}
      />
      <Transition
        show={ShowOpt}
        enter="transition-opacity duration-75"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-150"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="origin-top-right absolute right-0 mt-4 w-40 rounded-md shadow-lg">
          <div className="rounded-md bg-white shadow-xs" onMouseLeave = {ToggleOptions}>
            <div
              className="p-3"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="options-menu"
            >
              {children}
            </div>
          </div>
        </div>
      </Transition>
    </>
  );
};



export default PopUpMenu;


