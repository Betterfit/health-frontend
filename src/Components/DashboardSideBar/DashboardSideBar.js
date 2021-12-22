import clsx from "clsx";
import React from "react";

const DashboardSideBar = ({
  children,
  addonStyles,
  padding = "p-4",
  width = "2/5",
  cartOpen = false,
}) => {
  return (
    <div
      className={clsx(
        "w-full p-2 relative z-10",
        "lg:w-" +
          width +
          "md:w-" +
          width +
          (cartOpen
            ? " md:h-screen md:max-h-screen md:overflow-y-scroll"
            : " md:absolute md:mr-1")
      )}
      style={{
        maxWidth: 400,
      }}
    >
      <div
        className={
          `wrap bg-betterfit-pale-blue rounded-lg md:overflow-y-scroll ${padding} ` +
          (addonStyles ? addonStyles : "") +
          (cartOpen ? " md:h-full" : "")
        }
      >
        {children}
      </div>
    </div>
  );
};

export default DashboardSideBar;
