import clsx from "clsx";
import { ReactNode } from "hoist-non-react-statics/node_modules/@types/react";
import React from "react";

const DashboardSideBarInventory = ({
  children,
  addonStyles,
  padding = "p-4",
  width = "2/5",
}: {
  children: ReactNode;
  addonStyles: string;
  padding?: string;
  width?: string;
}) => {
  return (
    <div
      className={clsx(
        "w-full md:h-screen md:max-h-screen p-2 relative z-10",
        "lg:w-" + width
      )}
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

export default DashboardSideBarInventory;
