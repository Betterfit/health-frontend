import React , {useState, useEffect} from 'react';
import DashboardSupplier from 'Pages/Dashboards/DashboardSupplier';
import DashboardFacility from 'Pages/Dashboards/DashboardFacility';
import DashboardTraffic from 'Pages/Dashboards/DashboardTraffic';
import useStores from 'Helpers/useStores';
import {useAuthStore} from "Context/authContext";
const Dashboard  = () => {
    const authStore = useAuthStore();
    const [userType , setUserType] = useState(JSON.parse(authStore.user));
    return(
        <>
        {userType.user_profile.user_type === "facility_admin" && (
            <DashboardFacility/>
          )}
        {userType.user_profile.user_type === "supplier_admin" && (
            <DashboardSupplier/>
        )}
        {userType.user_profile.user_type === "traffic_controller" && (
            <DashboardTraffic/>
        )}
        </>
    )
}


export default Dashboard;