import FaciltyCard from "Components/Profile/FacilityCard";
import ProfileCard from "Components/Profile/ProfileCard";
import Slider from "Components/Slider/Slider";
import logo from "Images/Icons/logo-full.svg";
import React, { useState } from "react";
import SideBarDashboardTypeCTA from "./SideBarDashboardTypeCTA";
import SideBarNavigation from "./SideBarNavigation";
import SideBarProfile from "./SideBarProfile";

const UserInfo = (profile) => {
  switch (profile.user_type) {
    case "facility_admin":
      return profile.facility_name;
    case "supplier_admin":
      return profile.supplier_name;
    case "traffic_controller":
      return "Traffic Controller";
    default:
      return profile.email;
  }
};

const SideBar = ({ navItemsList }) => {
  const userData = JSON.parse(localStorage.getItem("user"));
  const userName = userData.username;
  const orgName = UserInfo(userData.user_profile);
  const userType = userData.user_profile.user_type;

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
    <div className="md:flex md:flex-shrink-0 sidebar">
      <div className="flex flex-col sidebar md:p-2 md:pr-0 w-full">
        <div
          className="flex flex-col md:h-0 flex-1 relative rounded-lg m-2 mb-0 md:m-0"
          style={{
            backgroundImage: "linear-gradient(120deg, #6D2CFF, #1332C7)",
          }}
        >
          <div className="flex-1 flex flex-col pt-8 pb-1 overflow-y-auto">
            <div className="sm:pl-8 px-4 border-white border-b border-opacity-25 mb-2">
              <div className="flex items-center flex-shrink-0 flex flex-row items-center justify-between">
                <img className="w-24 md:w-29" src={logo} alt="Betterfit" />
              </div>
              <div className="flex flex-row md:flex-col items-end md:items-start justify-between">
                <SideBarDashboardTypeCTA name={orgName} />
              </div>
            </div>
            <SideBarNavigation navList={navItemsList} />
          </div>
          <SideBarProfile
            userName={userName}
            userType={userType}
            showFacility={() => ToggleOptions("facility")}
            showProfile={() => ToggleOptions("profile")}
          />
        </div>
        <Slider active={ShowProfile.facility} close={ToggleOptions}>
          <FaciltyCard></FaciltyCard>
        </Slider>
        <Slider active={ShowProfile.profile} close={ToggleOptions}>
          <ProfileCard></ProfileCard>
        </Slider>
      </div>
    </div>
  );
};

export default SideBar;
