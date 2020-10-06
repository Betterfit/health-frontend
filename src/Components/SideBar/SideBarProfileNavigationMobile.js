import React from 'react'
import {
    Link
  } from "react-router-dom";

const SideBarProfileNavigationMobile = () => {
    return(
        <div class="top-0 px-4 py-4 z-0 flex flex-col border border-gray-400  shadow-lg bg-white ">
            <Link><span class="uppercase text-sm text-light-text my-2">Profile</span></Link>
            <Link><span class="uppercase text-sm text-light-text my-2">Logout</span></Link>
        </div>
    )
}

export default SideBarProfileNavigationMobile