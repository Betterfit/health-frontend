import React , {useState} from 'react';
import DashboardSideBar from 'Components/DashboardSideBar/DashboardSideBar';
import TitleUnderLine from 'Components/Content/TitleUnderLine'

const DashboardTrafficDashboard = () => {
    return(
        <div className="flex flex-col md:flex-row">
            <DashboardSideBar>
                <TitleUnderLine title={`Supply`} />  
            </DashboardSideBar>
            <div className={`w-full bg-gray-100 lg:relative lg:w-3/5 mx-auto h-screen overflow-y-scroll mt-8`}   >
                graphs here
            </div>
        </div>
    )
}

export default DashboardTrafficDashboard;

