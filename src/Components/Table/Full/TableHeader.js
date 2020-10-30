import React, { useState } from "react";
import { ReactSVG } from "react-svg";
import { NavLink } from "react-router-dom";
// components
import StatusButton from "Components/Content/StatusButton";
//images
import OpenClose from "Images/Icons/open-close.svg";
import DotMenu from "Images/Icons/dot-menu.svg";
import PopUpMenu from "Components/Content/PopUpMenu";

const HeaderText = ({ title, value, addOn_styles }) => {
  return (
    <div className="flex flex-col ">
      <span className="text-left text-xxs md:text-xs leading-4 font-normal uppercase tracking-wider uppercase text-white">
        {title}
      </span>
      <span
        className={`md:pt-1 text-left md:text-base leading-4 text-white md:pb-0 ${addOn_styles}`}
      >
        {value ? value : "N/A"}
      </span>
    </div>
  );
};

const TableHeader = ({ HeaderData }) => {
  const [open, setActive] = useState(false);
  const [ShowOpt, SetOptions] = useState(false);
  const ToggleOptions = () => {
    SetOptions(!ShowOpt);
  };
  const ToggleShowHide = () => {
    setActive(!open);
  };
  return (
    <>
      <div className="relative">
        <div className="flex flex-col md:flex-row justify-between md:py-4 py-3">
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
            <NavLink className="p-2" to={HeaderData.url}>
              <StatusButton status={HeaderData.status} />
            </NavLink>

            {HeaderData.options.length > 0 && (
              <>
                <ReactSVG
                  src={DotMenu}
                  onClick={ToggleOptions}
                  className="text-white opacity-50 pl-2"
                  beforeInjection={(svg) => {
                    svg.setAttribute("style", "width: 18px;height:18px");
                  }}
                />
                <PopUpMenu
                  data={HeaderData.options}
                  showPopup={ShowOpt}
                ></PopUpMenu>
              </>
            )}
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
