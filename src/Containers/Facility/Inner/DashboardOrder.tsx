import DashboardSideBar from "Components/DashboardSideBar/DashboardSideBar";
import OrderHeader from "Components/Order/NewOrderHeader";
import OrderCart from "Components/Order/OrderCart";
import ProductCatalog from "Components/Product/ProductCatalog";
import React from "react";

const DashboardOrder = () => {
  return (
    <div className="flex flex-col md:flex-row">
      <DashboardSideBar addonStyles=" flex flex-col" padding="p-0">
        <OrderHeader />
        <OrderCart />
      </DashboardSideBar>
      <div className="w-full min-width-0 md:w-3/5 mx-auto h-screen md:overflow-y-scroll mt-2 relative">
        <ProductCatalog />
      </div>
    </div>
  );
};

export default DashboardOrder;
