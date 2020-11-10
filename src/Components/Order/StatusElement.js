import React from "react";

const Status = ({ type = "draft" }) => {
  let title = "";
  let css_add_on = "text-gray-700 border border-gray-700";
  switch (type.toLowerCase()) {
    case "draft": {
      title = "Draft";
      css_add_on = "text-gray-700 border border-gray-700";
      break;
    }
    case "stat": {
      title = "Stat";
      css_add_on = "text-white bg-hot-pink";
      break;
    }
    case "normal": {
      title = "Normal";
      css_add_on = "text-white bg-gray-600";
      break;
    }
  }
  return (
    <div className="flex flex-shrink-0 items-center pl-3 pr-2">
      <div className={"uppercase text-sm px-2 py-1 rounded " + css_add_on}>
        {" "}
        {title}
      </div>
    </div>
  );
};

export default Status;
