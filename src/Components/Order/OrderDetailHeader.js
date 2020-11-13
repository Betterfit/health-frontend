import React from "react";
import Translator from "Helpers/Translator";


import BackNavigation from "Components/Helpers/BackNavigation";

const OrderComponent = ({ title, value, classes }) => {
  return (
    <div
      className={
        "flex flex-col pr-6 md:pr-12 lg:pr-16 md:pb-3 py-3 md:py-1 max-w-1/2 " +
        (classes ? classes : "")
      }
    >
      <span className="uppercase betterfit-graphite text-xxs tracking-extra-wide opacity-50">
        {Translator(title.replace(/_|-/g, ' '))}
      </span>
      <span className="text-betterfit-graphite text-base word break-words">
        {value}
      </span>
    </div>
  );
};

const OrderComponentTitle = ({ value, classes }) => {
  return (
    <div
      className={
        "flex flex-col pr-4 md:pb-3 py-3 md:py-1 " + (classes ? classes : "")
      }
    >
      <span className="text-betterfit-graphite text-3xl">{Translator(value)}</span>
    </div>
  );
};

const OrderDetailHeader = ({ order, actionComponent, children}) => {
  console.log("HERE")
  return (
    <div className="flex flex-col border-b pb-4 border-gray-400 relative">
      <BackNavigation link={"Back"} />
      <OrderComponentTitle value={`#${order.order_number}`} />
      <div className="flex flex-row mt-4">
        {Object.keys(order)
          .filter((key, i) => i > 0)
          .map((key, i) => {
            return <OrderComponent key={key} title={key} value={order[key]} />;
          })}
      </div>
      {children}
    </div>
  );
};
export default OrderDetailHeader;
