import React, { useContext } from "react";
import dayjs from 'dayjs';

const OrderComponent = ({ title, value, classes }) => {
  return (
    <div
      className={
        "flex flex-col pr-4 md:pb-3 py-3 md:py-1 max-w-1/2 " +
        (classes ? classes : "")
      }
    >
      <span className="uppercase betterfit-graphite text-xxs tracking-extra-wide opacity-50">{title}</span>
      <span className="text-betterfit-graphite text-base word break-words">{value}</span>
    </div>
  );
};

const OrderComponentTitle = ({ title, value, classes }) => {
    return (
      <div
        className={
          "flex flex-col pr-4 md:pb-3 py-3 md:py-1 " +
          (classes ? classes : "")
        }
      >
        <span className="uppercase text-betterfit-graphite text-xs tracking-extra-wide opacity-50">{title}</span>
        <span className="text-betterfit-graphite text-3xl">{value}</span>
      </div>
    );
  };


const NewOrderHeader = ({ order }) => {

    let orderDate = dayjs().format('MMM DD, YYYY');

    //TODO - pull this out of store eventually
    const facility2= {
      facility: ("Royal Alex") ,
      unit: "Emergency",
    };

  return (
    <div className="flex flex-col">
      <OrderComponentTitle
        title={orderDate}
        value={"New Order"}
      />
    <div className="flex flex-row">
      <OrderComponent
        title="Facility"
        value={facility2["facility"]}
      />
      <OrderComponent
        title="Unit"
        value={facility2["unit"]}
      />
      </div>
    </div>
  );
};
export default NewOrderHeader;
