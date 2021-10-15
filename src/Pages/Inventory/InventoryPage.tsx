import DashboardSideBar from "Components/DashboardSideBar/DashboardSideBar";
import DashboardProductDetail from "Containers/Supplier/Inner/DashboardProductDetail";
import React from "react";
import { Route } from "react-router-dom";
import InventoryOverview from "./InventoryOverview";

const InventoryPage = () => {
  return (
    <div className="">
      <InventorySidebar />
      <InventoryDetail />
    </div>
  );
};

const InventorySidebar = () => {
  return (
    <DashboardSideBar addonStyles="relative p-4">
      <div className="pt-4 px-4">
        <h2 className="text-3xl text-dark-blue my-3">Inventory</h2>
      </div>
      <hr />
      <InventoryOverview />
    </DashboardSideBar>
  );
};

const InventoryDetail = () => {
  return (
    <div
      className={`absolute w-full lg:relative lg:w-3/5 mx-auto overflow-y-scroll bg-white`}
    >
      <Route
        path="/dashboard/inventory/:id"
        exact
        render={(props) => {
          return <DashboardProductDetail edit={true} {...props} />;
        }}
      />
    </div>
  );
};

export default InventoryPage;
