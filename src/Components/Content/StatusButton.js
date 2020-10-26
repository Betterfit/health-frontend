import React from "react";

const StatStyles = (stat = "open") => {
  switch (stat.toLowerCase()) {
    case "draft":
      return {
        bg: "bg-status-grey",
        text: "text-status-dark-grey",
        title: "Draft",
      };
      break;
    case "open":
      return {
        bg: "bg-tag-light-green",
        text: "text-tag-light-green-txt",
        title: "Open",
      };
      break;
    case "cancelled":
      return {
        bg: "bg-tag-light-red",
        text: "text-tag-light-red-txt",
        title: "Cancelled",
      };
      break;
    case "delivered":
      return {
        bg: "bg-tag-light-blue",
        text: "text-tag-light-blue-txt",
        title: "Delivered",
      };
      break;
    case "approved":
      return {
        bg: "bg-tag-light-blue",
        text: "text-tag-light-blue-txt",
        title: "Delivered",
      };
      break;
    case "collecting":
      return {
        bg: "bg-tag-light-blue",
        text: "text-tag-light-blue-txt",
        title: "Collecting",
      };
      break;
    case "closed":
      return {
        bg: "bg-betterfit-pale-blue",
        text: "text-paragraph",
        title: "Closed",
      };
      break; 
    default:
      return {
        bg: "bg-tag-light-blue",
        text: "text-tag-light-blue-txt",
        title: "Approved",
      };
  }
};
const StatusButton = ({ status }) => {
  const styles = StatStyles(status);
  return (
    <div
      className={`uppercase rounded-full py-2 md:px-10 px-4 text-xxs text-center md:text-xs ${styles.bg} ${styles.text}`}
      // className={`uppercase rounded-full py-2 px-10 ${styles.bg ? styles.bg : "" } ${styles.text ? styles.text : "  "}`}
    >
      {styles.title}
    </div>
  );
};

export default StatusButton;
