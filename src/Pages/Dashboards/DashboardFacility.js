import SideBar from "Components/SideBar/SideBar";
import DashboardContainer from "Containers/Facility/DashboardContainer";
import NewOrder from "Images/Icons/new-order.svg";
import Order from "Images/Icons/order.svg";
import Resources from "Images/Icons/resources.svg";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

const DashboardFacility = () => {
  const navItemsList = [
    {
      to: "/dashboard/new-order/category/",
      name: "New Order",
      icon: NewOrder,
      key: "new-order",
    },
    {
      to: "/dashboard/orders",
      name: "Orders",
      icon: Order,
      key: "order",
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

export default DashboardFacility;
