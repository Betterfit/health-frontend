import DashboardSideBar from "Components/DashboardSideBar/DashboardSideBar";
import OrderHeader from "Components/Order/NewOrderHeader";
import OrderCart from "Components/Order/OrderCart";
import CategoryList from "Containers/Facility/Inner/CategoryList";
import DashboardProductDetail from "Containers/Facility/Inner/DashboardProductDetail";
import React from "react";
import ProductList, { useProductNavInfo } from "./ProductList";

const DashboardOrder = () => {
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
      <DashboardSideBar addonStyles=" flex flex-col" padding="p-0">
        <OrderHeader />
        <OrderCart />
      </DashboardSideBar>
      <div className="w-full min-width-0 md:w-3/5 mx-auto h-screen md:overflow-y-scroll mt-2 relative">
        {content}
      </div>
    </div>
  );
};

export default DashboardOrder;
