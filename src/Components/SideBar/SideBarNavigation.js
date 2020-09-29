import React,{useState} from 'react'


import {
    NavLink
  } from "react-router-dom";


  const SideBarNavigation = ({navList}) => {
    return(
        <nav class="flex-1 flex-row md:flex-col flex-wrap flex md:block justify-between items-baseline bg-white space-y-1 my-4 text-light-text">
            {navList.map(navItem => {
                return(
                    <NavLink class="mt-0" activeClass="active-nav" to={navItem.to} >
                       <span class="group flex items-center py-4 md:py-2 text-sm leading-5 font-medium text-xl font-body">{navItem.name}</span> 
                    </NavLink>
                )
            })}
        </nav>
    )
  } 

export default SideBarNavigation