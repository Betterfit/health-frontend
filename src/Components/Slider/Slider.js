import { Transition } from "@tailwindui/react";
import React, { useState, useEffect } from "react";
import { ReactSVG } from "react-svg";

// images
import Close from "Images/Icons/close.svg";

const Slider = ({ children }) => {
  return (
    <div className="fixed inset-0 overflow-y-scroll z-50 ">
      <div className="absolute inset-0">
        <section className="absolute inset-y-0 right-0 pl-10 max-w-full flex">
          <div className="w-screen max-w-md">
            <div className="flex flex-col min-h-full mr-2 pb-6 pt-3 bg-white shadow-xl rounded-lg m-3">
              <div className="border-grey-700 border-t-4 mx-2 p-2"></div>
              <div className="absolute w-12 h-12 mt-3 mr-2 left-0 top-0 border cursor-pointer shadow-lg bg-white z-10 rounded-full flex">
                <ReactSVG
                  src={Close}
                  onClick="#"
                  className="flex  m-auto"
                  beforeInjection={(svg) => {
                    svg.setAttribute("style", "width:16px;height:16px");
                  }}
                />
              </div>
              <div className="mx-8">{children}</div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Slider;
