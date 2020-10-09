import React from "react";
import Edit from "Images/Icons/edit.svg";
import { ReactSVG } from "react-svg";
import Status from "./StatusElement";
import dayjs from 'dayjs';

const OrderComponent = ({ title, value, classes }) => {
  return (
    <div
      className={
        "flex flex-col md:border-r md:border-gray-400 pr-4 md:px-8 md:pb-3 py-3 md:py-1 " +
        (classes ? classes : "")
      }
    >
      <span className="uppercase text-gray-600 text-xs">{title}</span>
      <span className="text-gray-700 text-base font-semibold">{value}</span>
    </div>
  );
};

const OrderComponentTitle = ({ value, classes, isDraft }) => {
  return (
    <>
      <div className={"flex flex-row baseline " + (classes ? classes : "")}>
        <h1 className="text-gray-700 text-2xl font-bold pt-2">
          Order #{value}
        </h1>

        {isDraft && (
          <div class="flex flex-row items-center">
            <Status type="draft" />
            <ReactSVG
              src={Edit}
              className=" text-gray-800"
              beforeInjection={(svg) => {
                svg.setAttribute(
                  "style",
                  "width:20px;height:20px;fill:#718096;"
                );
              }}
            />
          </div>
        )}
      </div>
    </>
  );
};

const OrderHeader = ({ order, facility, isNew, isEdit }) => {
    let orderNum = '';
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
    <div className="flex flex-wrap md:flex-no-wrap md:border-b border-gray-400 ">
      <OrderComponentTitle
        value={orderNum}
        isDraft={isDraft}
        classes="w-full md:w-auto"
      />
      <OrderComponent
        title="Facility"
        value={facility["facility"]}
        classes="md:ml-auto md:border-l row-start-2 md:w-auto"
      />
      <OrderComponent
        title="Unit"
        value={facility["unit"]}
        classes="w-1/2 md:w-auto"
      />
      <OrderComponent
        title="Date"
        value={orderDate}
        classes="w-full md:w-auto"
      />
    </div>
  );
};
export default OrderHeader;
