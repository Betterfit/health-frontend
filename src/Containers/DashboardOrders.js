import React from "react";
import Edit from "Images/Icons/edit.svg";
import { ReactSVG } from "react-svg";
import Status from "../Components/Order/StatusElement";
const OrderComponentTitle = ({ title, value, classes }) => {
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

const OrderComponentTitle2 = ({ value, classes, isDraft }) => {
  return (
    <>
      <div
        className={
          "flex flex-row baseline " +
          (classes ? classes : "")
        }
      >
        <h1 className = 'text-gray-700 text-2xl font-bold pt-2' >Order #{value}</h1>

      <div class="flex flex-row items-center">
        <Status text="Draft" />
        <ReactSVG
          src={Edit}
          className=" text-gray-800"
          beforeInjection={(svg) => {
            svg.setAttribute("style", "width:20px;height:20px;fill:#718096;");
          }}
        />
      </div>
      </div>
    </>
  );
};

const OrderHeader = ({ order }) => {
  return (
    <div className="flex md:border-b border-gray-400 flex-wrap md:flex-no-wrap">
      <OrderComponentTitle2 value="2342343" isDraft={true} classes="w-full md:w-auto" />
      <OrderComponentTitle
        title="Facility"
        value="Royal Alex"
        classes="md:ml-auto md:border-l row-start-2 md:w-auto"
      />
      <OrderComponentTitle title="Unit" value="Emergency" classes="w-1/2 md:w-auto" />
      <OrderComponentTitle title="Date" value="Sep 01, 2020" classes="w-full md:w-auto" />
    </div>
  );
};
const DashboardOrders = ({ changeTitle }) => {
  const dummmydata = {
    Order_number: "123124124",
    Facility: "Royal Alexandra",
    Unit: "Emergency",
    "Order Created": "Sept 01, 2020",
    isDraft: true,
  };
  changeTitle("Orders");
  return (
    <>
      <h1>Orders!!!!</h1>
      <OrderHeader order={dummmydata} />
    </>
  );
};

export default DashboardOrders;
