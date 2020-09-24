import React,{useState} from 'react'


import {
    NavLink
  } from "react-router-dom";


  const SideBarNavigation = ({navList}) => {
    return(
        <nav class="flex-1 bg-white space-y-1 my-4">
            {navList.map(navItem => {
                return(
                    <NavLink class="" to={navItem.to} >
                       <span class="group flex items-center py-2 text-sm leading-5 font-medium text-xl font-body">{navItem.name}</span> 
                    </NavLink>
                )
            })}
        </nav>
    )
  } 

export default SideBarNavigation