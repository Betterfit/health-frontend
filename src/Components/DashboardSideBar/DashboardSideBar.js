import React , {useState} from 'react';

const DashboardSideBar = ({children, addonStyles}) => {
    return(
        <div className="w-full lg:w-2/5 h-screen max-h-screen p-4 relative z-10" style={{minWidth:320}}>
            <div className={"wrap bg-gray-300 p-4 h-full rounded-lg overflow-y-scroll" + (addonStyles ? addonStyles : "")}>
              {children}  
            </div>
        </div>
    )
}
export default DashboardSideBar;

