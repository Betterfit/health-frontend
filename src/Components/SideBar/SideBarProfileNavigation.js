import React from 'react'
import {
    Link
  } from "react-router-dom";

const SideBarProfileNavigation = () => {
    return(
        <div className="w-4/5 absolute top-0 px-4 py-4 z-0 transform -translate-y-full flex flex-col border border-gray-400 border-b-0">
            <Link to="#"><span className="uppercase text-sm text-white opacity-75 my-2">Profile</span></Link>
            <a href="/logout" exact ><span className="uppercase text-sm text-white opacity-75 my-2">Logout</span></a>
        </div>
    )
}

export default SideBarProfileNavigation