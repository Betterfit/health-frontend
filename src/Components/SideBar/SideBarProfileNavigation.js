import React, { useState } from "react";
import { Link } from "react-router-dom";
import FaciltyCard from "Components/Profile/FacilityCard"
import Slider from "Components/Slider/Slider"

const SideBarProfileNavigation = ({ userType, showFacility, showProfile }) => {

  return (
      <>
    <div className={`cursor-pointer rounded-lg space-y-4 absolute top-0 px-4 py-4 z-0  flex flex-col bg-white text-14 text-betterfit-graphite
    md:w-4/5 transform md:-translate-y-full md:m-0 md:right-auto
    w-64 right-0 mr-6 `}>
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
