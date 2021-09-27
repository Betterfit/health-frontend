import DashboardSideBar from "Components/DashboardSideBar/DashboardSideBar";
import CategoryList from "Containers/Facility/Inner/CategoryList";
import DashboardNewOrder from "Containers/Facility/Inner/DashboardNewOrder";
import DashboardProductDetail from "Containers/Facility/Inner/DashboardProductDetail";
import { CartProvider, useCartStore } from "Context/cartContext";
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import ProductList, { useProductNavInfo } from "./ProductList";

const DashboardOrder = () => {
  console.log(useLocation());
  const cartStore = useCartStore() as any;
  useEffect(() => {
    cartStore?.getLocalCartStorage();
  }, []);
  const productNavInfo = useProductNavInfo();
  let content;
  if (productNavInfo.productId)
    content = (
      <DashboardProductDetail productOptionId={productNavInfo.productId} />
    );
  else if (productNavInfo.categoryId || productNavInfo.search)
    content = <ProductList />;
  else content = <CategoryList />;

  return (
    <div className="flex flex-col md:flex-row">
      {/* cart state is stored in a react context */}
      <CartProvider value={productNavInfo.orderId ? "editCart" : "cart"}>
        <DashboardSideBar addonStyles=" flex flex-col" padding="p-0">
          {!productNavInfo.orderId && <DashboardNewOrder />}
        </DashboardSideBar>
        <div className="w-full min-width-0 md:w-3/5 mx-auto h-screen md:overflow-y-scroll mt-2 relative">
          {content}
        </div>
      </CartProvider>
    </div>
  );
};

export default DashboardOrder;
