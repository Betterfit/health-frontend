import React, { useState } from "react";
import { Transition } from "@tailwindui/react";
import { ReactSVG } from "react-svg";
// components
import SideBarProfileNavigation from "./SideBarProfileNavigation";
import Profile from "Images/Icons/profile.svg";
import DotMenu from "Images/Icons/dot-menu.svg";
import ProfileCard from "Components/Profile/ProfileCard";
import OpenClose from "Images/Icons/open-close.svg";

const SideBarProfile = ({ userName, active, userType }) => {
  const [ShowNav, SetProfile] = useState(active);
  const ToggleProfileNavigation = () => {
    SetProfile(!ShowNav);
  };
  const [userData, setUserType] = useState(
    JSON.parse(localStorage.getItem("user"))
  );
  return (
    <>
      <div
        style={{ borderColor: "rgba(255,255,255,0.2)" }}
        className="p-0 block flex-shrink-0 flex border-t md:p-4 relative z-10"
        onMouseOver={ToggleProfileNavigation}
        onMouseOut={ToggleProfileNavigation}
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
          <SideBarProfileNavigation userType = {userType}>
          </SideBarProfileNavigation>
        </Transition>
        <a
          href="#"
          className="flex-shrink-0 w-full group block profile-container hidden md:block"
        >
            <div className="ml-3 flex flex-row items-center justify-between">
              <p className="text-md leading-5 font-medium text-white opacity-75 group-hover:text-gray-900">
                {userName}
              </p>
              <ReactSVG
                src={OpenClose}
                className=" opacity-50 m-2"
                beforeInjection={(svg) => {
                  svg.setAttribute(
                    "style",
                    "width:12px;height:12px;"
                  );
                }}
              />
            </div>
        </a>
      </div>
    </>
  );
};

export default SideBarProfile;
