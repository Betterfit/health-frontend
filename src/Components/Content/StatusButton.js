import Translator from "Helpers/Translator";
import React from "react";

const StatStyles = (stat = "open") => {
  switch (stat.toLowerCase()) {
    case "draft":
      return {
        bg: "bg-tag-light-blue",
        text: "text-tag-light-blue-txt",
        title: "Draft",
      };
    case "stat":
      return {
        bg: "bg-status-red",
        text: "text-status-dark-red",
        title: "Stat",
      };
    case "regular":
      return {
        bg: "bg-tag-light-blue",
        text: "text-tag-light-blue-txt",
        title: "Regular",
      };
    case "open":
      return {
        bg: "bg-tag-light-yellow",
        text: "text-tag-light-yellow-txt",
        title: "Open",
      };
    case "cancelled":
      return {
        bg: "bg-status-red",
        text: "text-status-dark-red",
        title: "Cancelled",
      };
    case "delivered":
      return {
        bg: "bg-tag-light-purple",
        text: "text-tag-light-purple-txt",
        title: "Delivered",
      };
    case "approved":
      return {
        bg: "bg-tag-light-green",
        text: "text-tag-light-green-txt",
        title: "Delivered",
      };
    case "in review":
      return {
        bg: "bg-tag-light-green",
        text: "text-tag-light-green-txt",
        title: "Needs Review",
      };
    case "matched":
      return {
        bg: "bg-tag-light-green",
        text: "text-tag-light-green-txt",
        title: "Matched",
      };
    case "no-match":
      return {
        bg: "bg-tag-light-yellow",
        text: "text-tag-light-yellow-txt",
        title: "No Match",
      };
    case "collecting":
      return {
        bg: "bg-tag-light-blue",
        text: "text-tag-light-blue-txt",
        title: "Collecting",
      };
    case "closed":
      return {
        bg: "bg-betterfit-pale-blue",
        text: "text-paragraph",
        title: "Closed",
      };
    default:
      return {
        bg: "bg-tag-light-blue",
        text: "text-tag-light-blue-txt",
        title: "Approved",
      };
  }
};
const StatusButton = ({ status, extraClasses }) => {
  const styles = StatStyles(status);
  return (
    <div
      className={`uppercase rounded-full py-2 w-28 text-xs text-center font-bold ${styles.bg} ${styles.text} ${extraClasses}`}
    >
      {Translator(styles.title)}
    </div>
  );
};

export default StatusButton;
