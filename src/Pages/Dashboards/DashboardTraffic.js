import SideBar from "Components/SideBar/SideBar";
import DashboardContainer from "Containers/Traffic/DashboardContainer";
import Dashboard from "Images/Icons/dashboard.svg";
import Inventory from "Images/Icons/inventory.svg";
import Matches from "Images/Icons/matches.svg";
import Resources from "Images/Icons/resources.svg";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";


const DashboardTraffic = () => {
  // usestate to save user and pass
  const navItemsList = [
    {
      to: "/dashboard/traffic-dashboard",
      name: "Dashboard",
      icon: Dashboard,
      key: "traffic-dashboard",
    },
    {
      to: "/dashboard/matches",
      name: "Matches",
      icon: Matches,
      key: "matches",
    },
    // {
    //     to:'/dashboard/orders',
    //     name:'Orders',
    //     icon: Order,
    //     key:'orders',
    // },
    {
      to: "/dashboard/inventory",
      name: "Inventory",
      icon: Inventory,
      key: "inventory",
    },
    {
      to: "/dashboard/resources",
      name: "Resources",
      icon: Resources,
      key: "resources",
    },
  ];
  return (
    <div className="md:h-screen flex-col md:flex-row flex overflow-hidden bg-white min-h-screen">
      <Router>
        <SideBar navItemsList={navItemsList} />
        <DashboardContainer />
      </Router>
    </div>
  );
};

export default DashboardTraffic;
