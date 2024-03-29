import DashboardSideBar from "Components/DashboardSideBar/DashboardSideBar";
import OrderCartToggle from "Components/Order/CartToggle";
import OrderCart from "Components/Order/OrderCart";
import ProductCatalog from "Components/Product/ProductCatalog";
import React from "react";
import { cartActions } from "Store/cartSlice";
import { useAppDispatch, useAppSelector } from "Store/store";

const DashboardOrder = () => {
  const cartOpen = useAppSelector((state) => state.cart.cartOpen);
  const dispatch = useAppDispatch();

  return (
    <div className="flex flex-col md:flex-row-reverse">
      <DashboardSideBar
        addonStyles="flex flex-col"
        padding="p-0"
        cartOpen={cartOpen}
      >
        <OrderCartToggle
          cartOpen={cartOpen}
          toggleCart={() => dispatch(cartActions.toggleCartOpen())}
        />
        {cartOpen && <OrderCart />}
      </DashboardSideBar>
      <div className="w-full min-width-0 mx-auto h-screen md:overflow-y-scroll pt-2 relative">
        <ProductCatalog />
      </div>
    </div>
  );
};

export default DashboardOrder;
