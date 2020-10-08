import React from "react";
import Edit from "Images/Icons/edit.svg";
import { ReactSVG } from "react-svg";
import Status from "./StatusElement";
import dayjs from 'dayjs';

const OrderComponent = ({ title, value, classes }) => {
  return (
    <div
      className={
        "flex flex-col pr-4 md:px-8 md:pb-3 py-3 md:py-1 " +
        (classes ? classes : "")
      }
    >
      <span className="uppercase text-betterfit-basic-blue text-xxs tracking-extra-wide">{title}</span>
      <span className="text-betterfit-graphite text-base">{value}</span>
    </div>
  );
};

const OrderComponentTitle = ({ title, value, classes }) => {
    return (
      <div
        className={
          "flex flex-col pr-4 md:px-8 md:pb-3 py-3 md:py-1 " +
          (classes ? classes : "")
        }
      >
        <span className="uppercase text-betterfit-basic-blue text-xs tracking-extra-wide">{title}</span>
        <span className="text-betterfit-graphite text-3xl">{value}</span>
      </div>
    );
  };


const NewOrderHeader = ({ order, facility, isNew, isEdit }) => {
    let orderNum = Math.floor(Math.random() * (99999999 - 55555555) + 55555555);
    let orderDate = '';
    let isDraft = false;
    //new order
    if (order == undefined)  {
        //TODO set orderNum to whatever api call to get order number
        //
        orderDate = dayjs().format('MMM DD, YYYY');
    }
    else {
        orderNum = order["order_number"];
        orderDate = order["order_date"];
        isDraft = order["is_draft"];
    }

  return (
    <div className="flex flex-col">
      <OrderComponentTitle
        title={orderDate}
        value={"New Order"}
      />
    <div className="flex flex-row">
      <OrderComponent
        title="Facility"
        value={facility["facility"]}
      />
      <OrderComponent
        title="Unit"
        value={facility["unit"]}
      />
      </div>
    </div>
  );
};
export default NewOrderHeader;
