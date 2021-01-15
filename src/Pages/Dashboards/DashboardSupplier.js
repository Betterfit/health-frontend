import SideBar from "Components/SideBar/SideBar";
import DashboardContainer from "Containers/Supplier/DashboardContainer";
import Inventory from "Images/Icons/inventory.svg";
import Resources from "Images/Icons/resources.svg";
import Ticket from "Images/Icons/ticket.svg";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

const DashboardSupplier = () => {
  const navItemsList = [
    {
      to: "/dashboard/tickets",
      name: "Tickets",
      icon: Ticket,
      key: "tickets",
    },
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

export default DashboardSupplier;
