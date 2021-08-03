import clsx from "clsx";
import React, { Dispatch, ReactNode, useRef } from "react";
import styles from "./AdminTabs.module.css";
import AnimatedHeightChange from "./AnimatedHeightChange";
import Icon from "./Icon";

export interface TabObject {
  header: string;
  icon?: string;
  content: ReactNode;
}

const AdminTabs = ({
  tabs,
  selectedIndex,
  setSelectedIndex,
  ariaLabel,
}: {
  tabs: TabObject[];
  selectedIndex: number;
  setSelectedIndex: Dispatch<number>;
  ariaLabel: string;
}) => {
  const tabListRef = useRef<HTMLDivElement>(null);
  return (
    <div
      className={styles.root}
      onKeyDown={(e) => {
        // switch between tabs with arrow keys
        if (["ArrowLeft", "ArrowRight"].includes(e.key)) {
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
            id={ariaLabel + "-" + i}
            role="tab"
            aria-label={tabs[i].header}
            aria-selected={selectedIndex === i}
            // tab is only focusable if it is selected
            tabIndex={selectedIndex === i ? 0 : -1}
            className={selectedIndex === i ? styles.selectedTab : styles.tab}
            onClick={() => setSelectedIndex(i)}
            // used in css
            title={tab.header}
          >
            {tab.icon && <Icon name={tab.icon} />}
            {tab.header}
          </button>
        ))}
      </div>
      <AnimatedHeightChange className={clsx(styles.border, "cardBorder ")}>
        <div
          aria-labelledby={ariaLabel + "-" + selectedIndex}
          role="tabpanel"
          className={clsx(styles.tabPanel)}
        >
          {tabs[selectedIndex].content}
        </div>
      </AnimatedHeightChange>
    </div>
  );
};

export default AdminTabs;
