import React from "react";

const StatStyles = (stat = "open") => {
  switch (stat.toLowerCase()) {
    case "draft":
      return {
        bg: "bg-tag-light-blue",
        text: "text-tag-light-blue-txt",
        title: "Draft",
      };
      break;
    case "open":
      return {
        bg: "bg-tag-light-yellow",
        text: "text-tag-light-yellow-txt",
        title: "Open",
      };
      break;
    case "cancelled":
      return {
        bg: "bg-status-red",
        text: "text-status-dark-red",
        title: "Cancelled",
      };
      break;
    case "delivered":
      return {
        bg: "bg-tag-light-purple",
        text: "text-tag-light-purple-txt",
        title: "Delivered",
      };
      break;
    case "approved":
      return {
        bg: "bg-tag-light-green",
        text: "text-tag-light-green-txt",
        title: "Delivered",
      };
      break;
    case "review":
      return {
        bg: "bg-tag-light-green",
        text: "text-tag-light-green-txt",
        title: "Needs Review",
      };
      break;
    case "matched":
      return {
        bg: "bg-tag-light-green",
        text: "text-tag-light-green-txt",
        title: "Matched",
      };
      break;
    case "no-match":
      return {
        bg: "bg-tag-light-yellow",
        text: "text-tag-light-yellow-txt",
        title: "No Match",
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
