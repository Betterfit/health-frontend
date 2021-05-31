import { useAuthStore } from "Context/authContext";
import DashboardFacility from "Pages/Dashboards/DashboardFacility";
import DashboardSupplier from "Pages/Dashboards/DashboardSupplier";
import DashboardTraffic from "Pages/Dashboards/DashboardTraffic";
import React, { useState } from "react";
import DynamicDashboard from "./Dashboards/DynamicDashboard";

const dynamicDashboardFlag = true;

const Dashboard = () => {
  const authStore = useAuthStore();
  const [userType] = useState(JSON.parse(authStore.user));
  if (dynamicDashboardFlag) return <DynamicDashboard />;
  return (
    <>
      {userType.user_profile.user_type === "facility_admin" && (
        <DashboardFacility />
      )}
      {userType.user_profile.user_type === "supplier_admin" && (
        <DashboardSupplier />
      )}
      {userType.user_profile.user_type === "traffic_controller" && (
        <DashboardTraffic />
      )}
    </>
  );
};

export default Dashboard;
