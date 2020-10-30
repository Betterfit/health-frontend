import React from "react";
import { ReactSVG } from "react-svg";

// images
import Close from "Images/Icons/close.svg";

const AlertModal = ({ error = true, children, updateState }) => {
  const title = error ? "Error" : "Success";
  return (
    <div
      className="fixed w-screen h-screen left-0 top-0 flex justify-center items-center"
      style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
    >



      <div className="w-3/4 md:w-1/2 lg:w-2/5 bg-white rounded shadow relative">
      <div
        className={`absolute w-12 h-12 mt-3 mr-2 right-0 top-0 border cursor-pointer 
        shadow-lg bg-white z-10 rounded-full hidden md:flex transform -translate-y-1/2 translate-x-1/2`}
        onClick={updateState}
      >
        <ReactSVG
          src={Close}
          className="flex  m-auto"
          beforeInjection={(svg) => {
            svg.setAttribute("style", "width:16px;height:16px");
          }}
        />
      </div>
        <div>
          <div className="px-6 py-4 border-b border-gray-300">
            <h2 className="text-betterfit-navy text-xl">{title}</h2>
          </div>
          <div className="py-6 px-6">
            <p className="text-paragraph text-base">{children}</p>
          </div>
        </div>
      </div>
      </div>
  );
};

export default AlertModal;
