import React from "react";

const SideBarTabs = ({ tabs, activeTab, handleClick, clearTab }) => {
  const tabChangeActive = (key, heading) => {
    handleClick(key, heading);
  };

  return (
    <div className="flex flex-col py-2 justify-start">
      {tabs.map((tab) => {
        return (
          <button
            key={tab.key}
            title={tab.descr}
            className={`mb-2 flex justify-center rounded-l-lg border border-betterfit-basic-blue border-opacity-0 hover:border-opacity-100
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
              className={`text-xs py-2 focus:outline-none ${
                tab.key === activeTab
                  ? "text-betterfit-basic-blue font-semibold"
                  : "text-blue"
              }`}
            >
              {tab.heading}
            </p>
          </button>
        );
      })}
      <button
        key={clearTab.key}
        title={clearTab.descr}
        className="mb-2 px-1 py-2 flex justify-center rounded-l-lg bg-status-red translate-x-1 border border-status-dark-red border-opacity-0 hover:border-opacity-100"
        onClick={() => {
          tabChangeActive(clearTab.key, clearTab.heading);
        }}
      >
        <p className="text-xs text-status-dark-red">{clearTab.heading}</p>
      </button>
    </div>
  );
};

export default SideBarTabs;
