import Tooltip from "Components/Content/Tooltip";
import React from "react";

const SideBarTabs = ({ tabs, activeTab, handleClick, clearTab }) => {
  const tabChangeActive = (key, heading) => {
    handleClick(key, heading);
  };

  return (
    <div className="flex flex-row flex-wrap py-2 justify-around md:flex-no-wrap md:flex-col lg:justify-start">
      {tabs.map((tab) => {
        return (
          <button
            key={tab.key}
            className={`mb-2 flex justify-between items-center rounded-lg border border-betterfit-basic-blue border-opacity-0 hover:border-opacity-100 pr-2 lg:rounded-r-none
                                      ${
                                        tab.key === activeTab
                                          ? "border-opacity-100 bg-white"
                                          : "bg-gray-300 border-0 "
                                      }`}
            onClick={() => {
              tabChangeActive(tab.key, tab.heading);
            }}
          >
            <p
              className={`text-xs py-2 px-2 focus:outline-none text-left ${
                tab.key === activeTab
                  ? "text-betterfit-basic-blue font-semibold"
                  : "text-blue"
              }`}
            >
              {tab.heading}
            </p>
            <Tooltip text={tab.descr} identifier={tab.key} />
          </button>
        );
      })}
      <button
        key={clearTab.key}
        className="mb-2 pr-2 py-2 flex justify-between items-center rounded-l-lg bg-status-red translate-x-1 border border-status-dark-red border-opacity-0 hover:border-opacity-100"
        onClick={() => {
          tabChangeActive(clearTab.key, clearTab.heading);
        }}
      >
        <p className="text-xs px-2 text-status-dark-red ">{clearTab.heading}</p>
        <Tooltip text={clearTab.descr} identifier={clearTab.key} />
      </button>
    </div>
  );
};

export default SideBarTabs;
