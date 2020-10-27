import React, { useState } from "react";
import { Transition } from "@tailwindui/react";
import { ReactSVG } from "react-svg";
// components
import SideBarProfileNavigation from "./SideBarProfileNavigation";
import Profile from "Images/Icons/profile.svg";
import DotMenu from "Images/Icons/dot-menu.svg";
import ProfileCard from "Components/Profile/ProfileCard";
import OpenClose from "Images/Icons/open-close.svg";
import FaciltyCard from "Components/Profile/FacilityCard";
import Slider from "Components/Slider/Slider";

const SideBarProfile = ({ userName, active, userType }) => {
  const [ShowNav, SetNav] = useState(active);
  const ToggleProfileNavigation = () => {
    SetNav(!ShowNav);
  };
  const [userData, setUserType] = useState(
    JSON.parse(localStorage.getItem("user"))
  );
  const [ShowProfile, SetProfile] = useState({
    profile: false,
    facility: false,
  });

  const ToggleOptions = (type) => {
    if (type === "profile") {
      SetProfile({ profile: true, facility: false });
    } else if (type === "facility") {
      SetProfile({ profile: false, facility: true });
    } else {
      SetProfile({ profile: false, facility: false });
    }
  };
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
          <SideBarProfileNavigation
            userType={userType}
            showFacility={() => ToggleOptions("facility")}
            showProfile={() => ToggleOptions("profile")}
          ></SideBarProfileNavigation>
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
                svg.setAttribute("style", "width:12px;height:12px;");
              }}
            />
          </div>
        </a>
      </div>
      <Slider active={ShowProfile.facility} close={ToggleOptions}>
        <FaciltyCard></FaciltyCard>
      </Slider>
      <Slider active={ShowProfile.profile} close={ToggleOptions}>
        <ProfileCard></ProfileCard>
      </Slider>
    </>
  );
};

export default SideBarProfile;
