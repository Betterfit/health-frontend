import React from "react";
import Button from "Components/Forms/Button";
import { Transition } from "@tailwindui/react";

const PopulateMenu = ({ value, link, type }) => {
  const PopupButton = (value, link) => {
    return (
      <form className="pt-2" method="POST" action="#">
        <Button
          text="Submit"
          color=" bg-betterfit-green"
          hoverColor="bg-green-800"
          text_size="text-sm"
        ></Button>
      </form>
    );
  };

  const PopupText = ({ value, link }) => {
    return (
      <a
        onClick={link}
        className="block py-3 text-sm focus:outline-none focus:bg-gray-100 capitalize "
        role="menuitem"
      >
        {value}
      </a>
    );
  };

  return (
    <>
      {type === "text" && <PopupText value={value} link={link}></PopupText>}
      {type === "button" && (
        <PopupButton value={value} link={link}></PopupButton>
      )}
    </>
  );
};

//Will accept array of item objects formed as following
// 'text': name of link
// 'action': where/what link should do
// 'type': can be either 'text' or 'button'
const PopUpMenu = ({ data, showPopup }) => {
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
          {data.map((item) => {
            return (
              <PopulateMenu
                value={item.text}
                link={item.action}
                type={item.type}
              />
            );
          })}
        </div>
      </div>
    </div>
    </Transition>
  );
};

export default PopUpMenu;
