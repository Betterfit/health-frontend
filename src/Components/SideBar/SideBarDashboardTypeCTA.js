import React from 'react'

const SideBarDashboardTypeCTA = ({name,subtext}) => {
    return(
        <div className="mt-3 sm:mt-6 mb-2 flex items-center pb-3">
            <div>
                <span className="text-base sm:text-22 text-white">{name}</span>
                <p className="text-10 text-white uppercase tracking-extra-wide opacity-75">{subtext}</p>  
            </div>
        </div>
    )
}

export default SideBarDashboardTypeCTA