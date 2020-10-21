import React, { useState } from "react";
import { ReactSVG } from "react-svg";
import { Transition } from "@tailwindui/react";
// components
import StatusButton from "Components/Content/StatusButton";
//images
import OpenClose from "Images/Icons/open-close.svg";
import DotMenu from "Images/Icons/dot-menu.svg";
import Button from "Components/Forms/Button";

const HeaderText = ({ title, value, addOn_styles }) => {
  return (
    <div className="flex flex-col ">
      <span className="text-left text-xxs md:text-xs leading-4 font-normal uppercase tracking-wider uppercase text-white">
        {title}
      </span>
      <span
        className={`md:pt-1 text-left md:text-base leading-4 text-white md:pb-0 ${addOn_styles}`}
      >
        {value}
      </span>
    </div>
  );
};

const TableHeader = ({ HeaderData }) => {
  const [open, setActive] = useState(false);
  const [ShowOpt, SetOptions] = useState(false);
  const ToggleProfileNavigation = () => {
    SetOptions(!ShowOpt);
  };
  const ToggleShowHide = () => {
    setActive(!open);
  };
  return (
    <>
      <div className="relative">
        <div className="flex flex-col md:flex-row justify-between md:py-4 pb-2">
          <div>
            <HeaderText
              title="Purchase Order"
              value={HeaderData.purchase_ord}
              addOn_styles=" font-semibold"
            />
          </div>
          <div
            className={
              "md:flex flex-col flex-grow justify-evenly md:flex-row pt-5 md:pt-0 pb-2 " +
              (open ? " flex" : " hidden")
            }
          >
            <HeaderText title="Ordered By" value={HeaderData.ordered_by} />
            <HeaderText title="Ordered On" value={HeaderData.ordered_on} />
            <HeaderText title="Order Number" value={HeaderData.order_no} />
          </div>
          <div className="flex flex-row items-center absolute md:static top-0 right-0">
            <StatusButton status={HeaderData.status} />
            <ReactSVG
              src={DotMenu}
              onClick={ToggleProfileNavigation}
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
                <div className="rounded-md bg-white shadow-xs">
                  <div
                    className="p-3"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="options-menu"
                  >
                    <a
                      href="#"
                      className="block py-3 text-sm focus:outline-none focus:bg-gray-100 "
                      role="menuitem"
                    >
                      Edit
                    </a>
                    <a
                      href="#"
                      className="block py-3 text-sm focus:outline-none focus:bg-gray-100 "
                      role="menuitem"
                    >
                      Delete
                    </a>
                    <form className="pt-2" method="POST" action="#">
                      <Button
                        text="Submit"
                        color=" bg-betterfit-green"
                        hoverColor="bg-green-800"
                        text_size="text-sm"
                      ></Button>
                    </form>
                  </div>
                </div>
              </div>
            </Transition>
            <ReactSVG
              src={OpenClose}
              onClick={ToggleShowHide}
              className="text-white opacity-50 md:hidden pl-2"
              beforeInjection={(svg) => {
                svg.setAttribute("style", "width: 18px;height:18px");
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default TableHeader;
