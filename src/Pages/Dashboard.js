import React , {useState, useEffect} from 'react';
import DashboardSupplier from 'Pages/Dashboards/DashboardSupplier';
import DashboardFacility from 'Pages/Dashboards/DashboardFacility';

const Dashboard  = () => {
    const [userType , setUserType] = useState(JSON.parse(localStorage.getItem('user')));
    return(
        <>
        {userType && userType.user_profile.user_type === "facility_admin" && (
            <DashboardFacility/>
          )}
          {userType && userType.user_profile.user_type === "supplier_admin" && (
            <DashboardSupplier/>
        )}
        </>
    )
}


export default Dashboard;