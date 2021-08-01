import clsx from "clsx";
import React, { Dispatch, useRef } from "react";
import styles from "./AdminTabs.module.css";
import Auto from "./Auto";
import Icon from "./Icon";

export interface TabObject {
  header: string;
  icon?: string;
}

// TODO: proper keybinds according to aria spec
// https://www.w3.org/TR/wai-aria-practices-1.1/examples/tabs/tabs-1/tabs.html
const AdminTabs = ({
  tabs,
  selectedIndex,
  setSelectedIndex,
  ariaLabel,
  children,
}: {
  tabs: TabObject[];
  selectedIndex: number;
  setSelectedIndex: Dispatch<number>;
  ariaLabel: string;
  children: React.ReactNode;
}) => {
  const tabListRef = useRef<HTMLDivElement>(null);
  return (
    <div
      className={styles.root}
      onKeyDown={(e) => {
        // setHeight(height + 50);
        if (["ArrowLeft", "ArrowRight"].includes(e.key)) {
          console.log("here1");
          const newIndex =
            e.key === "ArrowRight"
              ? Math.max(selectedIndex + 1, tabs.length - 1)
              : Math.min(selectedIndex - 1, 0);
          setSelectedIndex(newIndex);
          const newSelectedTab = tabListRef.current?.children[
            newIndex
          ] as HTMLButtonElement;
          newSelectedTab.focus();
          console.log(e.currentTarget.children);
        }
      }}
    >
      <div
        role="tablist"
        aria-label={ariaLabel}
        className={styles.tabList}
        ref={tabListRef}
      >
        {tabs.map((tab, i) => (
          <button
            key={i}
            style={{
              zIndex: selectedIndex === i ? tabs.length : tabs.length - i,
            }}
            role="tab"
            aria-label={tabs[i].header}
            aria-selected={selectedIndex === i}
            // tab is only focusable if it is selected
            tabIndex={selectedIndex === i ? 0 : -1}
            className={
              // "flex bg-sky-blue hover:bg-sky-blue  p-2 rounded-t-lg border-primary-blue border-t-2 border-l-2 border-r-2"

              selectedIndex === i ? styles.selectedTab : styles.tab
            }
            onClick={() => setSelectedIndex(i)}
          >
            {tab.icon && <Icon name={tab.icon} />}
            {tab.header}
          </button>
        ))}
      </div>
      <Auto className={clsx(styles.border, "cardBorder ")}>
        <div>
          <div
            aria-label={tabs[selectedIndex].header}
            role="tabpanel"
            className={clsx(styles.tabPanel)}
          >
            {children}
          </div>
        </div>
      </Auto>
    </div>
  );
};

export default AdminTabs;
