import React from "react";
import dayjs from "dayjs";
import Translator from "Helpers/Translator";

const OrderComponent = ({ title, value, classes }) => {
  return (
    <div
      className={
        "flex flex-col pr-4 md:pb-3 py-3 md:py-1 max-w-1/2 " +
        (classes ? classes : "")
      }
    >
      <span className="uppercase betterfit-graphite text-xxs tracking-extra-wide opacity-75 font-semibold">
        {Translator(title)}
      </span>
      <span className="text-betterfit-graphite text-base word break-words">
        {value}
      </span>
    </div>
  );
};

const OrderComponentTitle = ({ title, value, classes }) => {
  return (
    <div
      className={
        "flex flex-col pr-4 md:pb-3 py-3 md:py-1 " + (classes ? classes : "")
      }
    >
      <span className="uppercase text-betterfit-graphite text-xs tracking-extra-wide opacity-75 font-semibold">
        {Translator(title)}
      </span>
      <span className="text-betterfit-graphite text-3xl">{value}</span>
    </div>
  );
};

const NewOrderHeader = ({ data }) => {
  let orderDate = dayjs().format("MMM DD, YYYY");
  const order_no = data?.order_number
    ? data.order_number
    : Translator("New Order");
  const facility = data?.facility;
  const unit = data?.unit;
  const purchase_order = data?.purchase_order;

  return (
    <div className="flex flex-col after-line p-4 pb-2 border-b border-betterfit-grey border-opacity-40">
      <OrderComponentTitle title={orderDate} value={order_no} />
      {purchase_order && (
        <OrderComponent title="Purchase Order" value={purchase_order} />
      )}
      <div className="flex flex-row">
        {facility && <OrderComponent title="Facility" value={facility} />}
        {unit && <OrderComponent title="Unit" value={unit} />}
      </div>
    </div>
  );
};
export default NewOrderHeader;
