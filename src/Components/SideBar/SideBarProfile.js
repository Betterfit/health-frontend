import React, { useState } from "react";
import { Transition } from "@tailwindui/react";
import { ReactSVG } from "react-svg";
// components
import SideBarProfileNavigation from "./SideBarProfileNavigation";
import DotMenu from "Images/Icons/dot-menu.svg";
import OpenClose from "Images/Icons/open-close.svg";

const SideBarProfile = ({ userName, userType, showFacility, showProfile }) => {
  const [ShowNav, SetNav] = useState(false);
  const ToggleProfileNavigation = () => {
    SetNav(!ShowNav);
  };

  return (
    <>
      <div
        style={{ borderColor: "rgba(255,255,255,0.2)" }}
        className="p-0 block flex-shrink-0 flex md:border-t md:p-4 md:relative z-10 md:m-0 fixed mt-5 right-0 mr-4"
      >
        <Transition
          show={ShowNav}
          enter="transition-opacity duration-75"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <SideBarProfileNavigation
            userType={userType}
            showFacility={showFacility}
            showProfile={showProfile}
            close={ToggleProfileNavigation}
          ></SideBarProfileNavigation>
        </Transition>
        <a
          href="#"
          className="flex-shrink-0 w-full group profile-container"
          onClick={ToggleProfileNavigation}
        >
          <div className="ml-3 flex flex-row items-center justify-between">
            <p className=" text-sm md:text-base leading-5 font-medium text-white opacity-75 group-hover:text-gray-900">
              {userName}
            </p>
            <ReactSVG
              src={OpenClose}
              className=" opacity-50 m-2 hidden md:block"
              beforeInjection={(svg) => {
                svg.setAttribute("style", "width:12px;height:12px;");
              }}
            />
            <ReactSVG
              src={DotMenu}
              className="text-white opacity-50 md:hidden pointer-events-auto"
              beforeInjection={(svg) => {
                svg.setAttribute("style", "width: 15px;height:15px");
              }}
            />
          </div>
        </a>
      </div>
    </>
  );
};

export default SideBarProfile;
