import React from "react";
import { ReactSVG } from "react-svg";

import Critical from "Images/Icons/critical.svg";
import ControllerCardStatus from "Components/TrafficControllerSideBar/ControllerCardStatus";

//Styles associated with each status (normal, critical, warn)
const StatStyles = (status = "normal") => {
  switch (status.toLowerCase()) {
    case "normal":
      return {
        bg: "bg-tag-light-blue",
        text: "text-tag-light-blue-txt",
      };
      break;
    case "warning":
      return {
        bg: "bg-tag-light-yellow",
        text: "text-tag-light-yellow-txt",
      };
    case "critical":
      return {
        bg: "bg-tag-light-red",
        text: "text-tag-light-red-txt",
      };
    default:
      return {
        bg: "bg-tag-light-blue",
        text: "text-tag-light-blue-txt",
      };
  }
};

//Takes in a products object which must have 
// status [critical,normal,warn],
// name - the name of the product
// orders - the quantity of orders
// supply - the quantity of supply
const ControllerCard = ({ products }) => {
  console.log(products.status);
  const styles = StatStyles(products.status);

  return (
    <div className="bg-white rounded flex flex-row items-center justify-between p-4 m-1 relative ">
      <span className={`text-base font-bold ${styles.text}`}>
        {products.name}
      </span>
      <div className="space-x-1 flex flex-row">
        <ControllerCardStatus
          value={products.orders}
          textStyle={styles.text}
          background={styles.bg}
          left={true}
        ></ControllerCardStatus>
        <ControllerCardStatus
          value={products.supply}
          textStyle={styles.text}
          background={styles.bg}
          left={false}
        ></ControllerCardStatus>
      </div>
      {products.status === "critical" && (
        <ReactSVG
          src={Critical}
          className="absolute right-0 -mr-2 -translate-y-1/2"
          beforeInjection={(svg) => {
            svg.setAttribute("style", "width:20px;");
          }}
        />
      )}
    </div>
  );
};

export default ControllerCard;
