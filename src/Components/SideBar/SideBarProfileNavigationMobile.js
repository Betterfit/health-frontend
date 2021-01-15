import React from "react";
import { Link } from "react-router-dom";

const SideBarProfileNavigationMobile = () => {
  return (
    <div className="top-0 px-4 py-4 z-0 flex flex-col border border-gray-400  shadow-lg bg-white ">
      <Link>
        <span className="uppercase text-sm text-white opacity-75 my-2">
          Profile
        </span>
      </Link>
      <a href="/logout" exact>
        <span className="uppercase text-sm text-white opacity-75 my-2">
          Logout
        </span>
      </a>
    </div>
  );
};

export default SideBarProfileNavigationMobile;
