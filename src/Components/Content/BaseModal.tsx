import React, { ReactNode } from "react";

const BaseModal = ({
  children,
  buttons,
}: {
  children: ReactNode;
  buttons: ReactNode;
}) => {
  return (
    <div
      className="fixed w-screen h-screen left-0 top-0 flex justify-center items-center z-30"
      style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
    >
      <div className="w-3/4 md:w-1/2 lg:w-2/5 xl:w-1/3 bg-white rounded shadow">
        <div>{children}</div>
        <div className="flex w-full justify-between pt-4 border-t border-gray-300 items-center px-4 py-4">
          {buttons}
        </div>
      </div>
    </div>
  );
};

export default BaseModal;
