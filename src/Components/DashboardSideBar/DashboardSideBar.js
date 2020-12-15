import React, { useState } from "react";

const DashboardSideBar = ({ children, addonStyles, padding = "p-4" }) => {
  return (
    <div
      className="w-full lg:w-2/5 md:h-screen md:max-h-screen p-2 relative z-10"
      style={{ minWidth: 320 }}
    >
      <div
        className={
          `wrap bg-betterfit-pale-blue md:h-full rounded-lg md:overflow-y-scroll ${padding}` +
          (addonStyles ? addonStyles : "")
        }
      >
        {children}
      </div>
    </div>
  );
};
export default DashboardSideBar;
