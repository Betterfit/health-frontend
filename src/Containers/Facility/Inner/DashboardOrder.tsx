import React, { useState } from "react";
import DashboardSideBar from "Components/DashboardSideBar/DashboardSideBar";
import OrderCartToggle from "Components/Order/NewOrderHeader";
import OrderCart from "Components/Order/OrderCart";
import ProductCatalog from "Components/Product/ProductCatalog";

const DashboardOrder = () => {
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <div className="flex flex-col md:flex-row-reverse">
      <DashboardSideBar
        addonStyles="flex flex-col"
        padding="p-0"
        cartOpen={cartOpen}
      >
        <OrderCartToggle
          cartOpen={cartOpen}
          toggleCart={() => setCartOpen(!cartOpen)}
        />
        {cartOpen && <OrderCart />}
      </DashboardSideBar>
      <div className="w-full min-width-0 mx-auto h-screen md:overflow-y-scroll mt-2 relative">
        <ProductCatalog />
      </div>
    </div>
  );
};

export default DashboardOrder;
