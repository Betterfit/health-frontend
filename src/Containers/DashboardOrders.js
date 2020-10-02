import React from "react";
import OrderHeader from '../Components/Order/OrderHeader'

const DashboardOrders = ({ changeTitle }) => {
    //TODO For testing and developing only
  const Info = {
    facility: "Royal Alexandra",
    unit: "Emergency",
  };
  const dummmydata = {
    order_number: "123124124",
    order_date: "Sept 01, 2020",
    is_draft: true,
  };
  changeTitle("Orders");
  return (
    <>
      <h1>Orders!!!!</h1>
      <OrderHeader facility={Info} />
    </>
  );
};

export default DashboardOrders;
