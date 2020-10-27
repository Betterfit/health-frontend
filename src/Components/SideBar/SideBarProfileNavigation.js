import React, { useState } from "react";
import { Link } from "react-router-dom";
import FaciltyCard from "Components/Profile/FacilityCard"
import Slider from "Components/Slider/Slider"

const SideBarProfileNavigation = ({ userType, showFacility, showProfile }) => {

  return (
      <>
    <div className="w-4/5 rounded-lg space-y-4 absolute top-0 px-4 py-4 z-0 transform -translate-y-full flex flex-col bg-white text-14 text-betterfit-graphite">
      {userType === 'facility_admin' && (
        <a onClick={showFacility}>
          <span className="opacity-75 my-2">Facility Profile</span>
        </a>
      )}
      <a onClick={showProfile}>
        <span className="opacity-75 my-2">Profile</span>
      </a>
      <a href="/logout">
        <span className="opacity-75 my-2">Logout</span>
      </a>
    </div>

    </>
  );
};

export default SideBarProfileNavigation;
