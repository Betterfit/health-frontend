import React from "react";
import Button from "Components/Forms/Button";
import { Transition } from "@tailwindui/react";

//Will accept array of item objects formed as following
// 'text': name of link
// 'action': where/what link should do
// 'type': can be either 'text' or 'button'
const PopUpMenu = ({ data, showPopup, children}) => {
  return (
    <Transition
    show={showPopup}
    enter="transition-opacity duration-75"
    enterFrom="opacity-0"
    enterTo="opacity-100"
    leave="transition-opacity duration-150"
    leaveFrom="opacity-100"
    leaveTo="opacity-0"
  >
    <div className="origin-top-right absolute right-0 mt-4 w-40 rounded-md shadow-lg">
      <div className="rounded-md bg-white shadow-xs">
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
  );
};

export default PopUpMenu;
