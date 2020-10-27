import React from 'react';
import { ReactSVG } from 'react-svg'

import {
    NavLink
  } from "react-router-dom";

    const SideBarNavigation = ({navList}) => {
    return(
        <nav className="flex-1 flex-row md:flex-col flex-wrap flex md:block justify-around items-baseline space-y-1 mt-4 md:my-4 text-light-text">
            {navList.map(navItem => {
                return(
                    <div key={`menu_item_${navItem.key}`}>
                        <NavLink className="mt-0 block nav opacity-75 flex flex-col sm:flex-row items-center" activeClassName="active-nav" to={navItem.to} >
                        <ReactSVG src={navItem.icon} className=" text-white sm:p-2"  beforeInjection={(svg) => { svg.setAttribute('style', 'width: 24px;height:24px')}}  />
                        <span className="group flex items-center py-2 text-sm leading-5 font-medium sm:text-xl font-body text-white">{navItem.name}</span> 
                        </NavLink>
                    </div>
                )
            })}
        </nav>
    )
  } 

export default SideBarNavigation