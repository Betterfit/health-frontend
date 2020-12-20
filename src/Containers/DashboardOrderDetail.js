import OrderDetailHeader from "Components/Order/OrderDetailHeader";
import React from "react";

const DashboadOrderDetail = ({ children, actionComponent, headerData }) => {
  return (
    <div className="w-full py-4 pt-6 px-4 sm:px-6 md:px-8">
      <OrderDetailHeader order={headerData}>
        {actionComponent}
      </OrderDetailHeader>
      {children}
    </div>
  );
};

export default DashboadOrderDetail;
