import React, { useContext } from "react";
import dayjs from 'dayjs';
import BackNavigation from 'Components/Helpers/BackNavigation'

const OrderComponent = ({ title, value, classes }) => {
  return (
    <div
      className={
        "flex flex-col pr-6 md:pr-12 lg:pr-16 md:pb-3 py-3 md:py-1 max-w-1/2 " +
        (classes ? classes : "")
      }
    >
      <span className="uppercase betterfit-graphite text-xxs tracking-extra-wide opacity-50">{title}</span>
      <span className="text-betterfit-graphite text-base word break-words">{value}</span>
    </div>
  );
};

const OrderComponentTitle = ({ value, classes }) => {
    return (
      <div
        className={
          "flex flex-col pr-4 md:pb-3 py-3 md:py-1 " +
          (classes ? classes : "")
        }
      >
        <span className="text-betterfit-graphite text-3xl">{value}</span>
      </div>
    );
  };


const OrderDetailHeader = ({ order , actionComponent }) => {
  
  let orderDate = dayjs(order.order_date).format('MMM DD, YYYY');
  return (
    <div className="flex flex-col border-b pb-4 border-gray-400 relative">
        <BackNavigation link={"Back"} />
        <OrderComponentTitle
        value={`#${order.order_number}`}
        />
        <div className="flex flex-row mt-4">
            <OrderComponent
                title="Facility"
                value={order.facility}
            />
            <OrderComponent
                title="Unit"
                value={order.unit}
            />
            <OrderComponent
                title="Shipping Address"
                value={order.shipping_address}
            />
            <OrderComponent
                title="Order Date"
                value={orderDate}
            />
        </div>
        <div className="absolute top-0 right-0">
            {actionComponent}
        </div>
    </div>
  );
};
export default OrderDetailHeader;