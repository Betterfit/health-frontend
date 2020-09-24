import React from 'react'
import { ReactSVG } from 'react-svg'
import RightArrow from 'Images/Icons/right-arrow.svg'
const SideBarDashboardTypeCTA = ({name,location}) => {
    return(
        <div class="mt-6 mb-2 flex items-center">
            <div>
                <span class="font-bold text-lg text-gray-700">{name}</span>
                <p class="text-sm text-light-text">{location}</p>  
            </div>
            <ReactSVG src={RightArrow} className="w-10 ml-6"  beforeInjection={(svg) => { svg.setAttribute('style', 'width: 16px;')}}  />
        </div>
    )
}

export default SideBarDashboardTypeCTA