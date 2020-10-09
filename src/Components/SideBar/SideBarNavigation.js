import React from 'react';
import {
    NavLink
  } from "react-router-dom";

    const SideBarNavigation = ({navList}) => {
    return(
        <nav className="flex-1 flex-row md:flex-col flex-wrap flex md:block justify-between items-baseline space-y-1 my-4 text-light-text">
            {navList.map(navItem => {
                return(
                    <NavLink className="mt-0 block nav opacity-75" activeclassName="active-nav" to={navItem.to} >
                       <span className="group flex items-center py-4 md:py-2 text-sm leading-5 font-medium text-xl font-body text-white">{navItem.name}</span> 
                    </NavLink>
                )
            })}
        </nav>
    )
  } 

export default SideBarNavigation