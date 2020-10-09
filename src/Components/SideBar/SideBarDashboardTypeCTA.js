import React from 'react'
import { ReactSVG } from 'react-svg'
import RightArrow from 'Images/Icons/right-arrow.svg'
const SideBarDashboardTypeCTA = ({name,location}) => {
    return(
        <div className="mt-6 mb-2 flex items-center">
            <div>
                <span className="font-bold text-lg text-white">{name}</span>
                <p className="text-sm text-white">{location}</p>  
            </div>
            {/* <ReactSVG src={RightArrow} className="w-10 ml-6"  beforeInjection={(svg) => { svg.setAttribute('style', 'width: 16px;')}}  /> */}
        </div>
    )
}

export default SideBarDashboardTypeCTA