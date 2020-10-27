import { Transition } from "@tailwindui/react";
import React, { useState, useEffect } from "react";
import { ReactSVG } from "react-svg";
import BackNav from "Components/Helpers/BackNavigation";

// images
import Close from "Images/Icons/close.svg";

const Slider = ({ children, active, close }) => {
  return (
    <Transition
      show={active}
      enter="transition-opacity duration-75"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-150"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className="md:fixed inset-0 md:overflow-y-scroll z-50 md:bg-transparent">
        <div className="md:absolute inset-0 md:background-blur">
          <section className="md:absolute inset-y-0 right-0 md:pl-10 max-w-full flex">
            <div className="w-screen md:max-w-md">
              <div className="flex flex-col min-h-full md:mr-2 pb-6 md:pt-3 bg-white md:shadow-xl rounded-lg md:m-3">
                <div className="border-grey-700 md:border-t-4 mx-2 md:p-2"></div>

                <div
                  className="absolute w-12 h-12 mt-3 mr-2 left-0 top-0 border cursor-pointer shadow-lg bg-white z-10 rounded-full hidden md:flex"
                  onClick={close}
                >
                  <ReactSVG
                    src={Close}
                    className="flex  m-auto"
                    beforeInjection={(svg) => {
                      svg.setAttribute("style", "width:16px;height:16px");
                    }}
                  />
                </div>
                <div className="mx-8">
                  <div className="md:hidden pb-4">
                    <BackNav link="Back" onClickOverride={close}></BackNav>
                  </div>
                  {children}
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </Transition>
  );
};

export default Slider;
