import React , {useState} from 'react';

const DashboardSideBar = ({children}) => {
    return(
        <div className="w-2/5 h-screen max-h-screen p-4 ">
            <div className="wrap bg-gray-300 p-4 h-full rounded-lg overflow-y-scroll">
              {children}  
            </div>
        </div>
    )
}
export default DashboardSideBar;

