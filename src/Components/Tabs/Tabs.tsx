import React, { ReactNode, useState } from "react";
// components
import TabHeadings from "./TabHeadings";

export interface Tab {
  heading: string;
  content?: ReactNode;
  key: string;
  amount?: number;
}

export interface TabsProps {
  tabs: Tab[];
  headingComp?: ReactNode;
  amount?: boolean;
  tabCallBack?: (tabKey: string) => void;
  setActive?: string;
  longUnderline?: boolean;
}

const Tabs = ({
  tabs,
  headingComp,
  amount,
  tabCallBack,
  setActive,
  longUnderline = true,
}: TabsProps) => {
  const [activeTab, setActiveTab] = useState(
    setActive ? setActive : tabs[0].key
  );

  const Headings = tabs.map((tab) => {
    return {
      heading: tab.heading,
      key: tab.key,
      amount: tab.amount,
    };
  });

  const headingChangeActive = (key: string) => {
    setActiveTab(key);
    if (tabCallBack) {
      tabCallBack(key);
    }
  };

  return (
    <div className="flex-1">
      <TabHeadings
        headings={Headings}
        headingFunction={headingChangeActive}
        headingComp={headingComp}
        amount={amount ? amount : false}
        setActive={setActive}
        longUnderline={longUnderline}
      />
      {tabs.map((tab) => {
        return (
          <div
            key={tab.key}
            className={`px-4 ${
              tab.key === activeTab ? "opacity-100 visible" : "opacity-0 hidden"
            }`}
          >
            {tab.content}
          </div>
        );
      })}
    </div>
  );
};

export default Tabs;
