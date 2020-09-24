import React from 'react'
import {
    Link
  } from "react-router-dom";

const SideBarProfileNavigation = () => {
    return(
        <div class="w-4/5 absolute top-0 px-4 py-4 z-0 transform -translate-y-full flex flex-col border border-gray-400 border-b-0">
            <Link><span class="uppercase text-sm text-light-text my-2">Profile</span></Link>
            <Link><span class="uppercase text-sm text-light-text my-2">Logout</span></Link>
        </div>
    )
}

export default SideBarProfileNavigation