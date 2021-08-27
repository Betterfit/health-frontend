import clsx from "clsx";
import Translator from "Helpers/Translator";
import React, { useState } from "react";
import styles from "./Tabs.module.css";

const TabHeadings = ({
  headings,
  headingFunction,
  headingComp,
  amount,
  setActive,
  longUnderline,
}) => {
  const [activeHeading, setActiveHeading] = useState(
    setActive ? setActive : headings[0].key
  );
  return (
    <div
      className={clsx(
        // "flex flex-col-reverse md:flex-row mb-8 flex-1 md:items-center relative",
        longUnderline && "border-b border-gray-400",
        styles.headings,
        "specialThing"
      )}
    >
      <div
        className={clsx(
          "flex flex-row flex-1 h-full mr-3 px-4",
          styles.headingsList
        )}
      >
        {headings.map((heading) => {
          return (
            <div className="pr-6 " key={heading.key}>
              <button
                role="tab"
                className={clsx(
                  "pt-4 pb-2 focus:outline-none relative mr-2 ",
                  "noResizeOnBold",
                  heading.key === activeHeading
                    ? styles.selectedTab
                    : styles.tab
                )}
                data-text={heading.heading}
                onClick={() => {
                  headingFunction(heading.key);
                  setActiveHeading(heading.key);
                }}
              >
                {Translator(heading.heading)}
                {amount && (
                  <span
                    className="absolute text-sm text-blue ml-1"
                    style={{ marginTop: -5 }}
                  >
                    {heading.amount}
                  </span>
                )}
              </button>
            </div>
          );
        })}
      </div>
      {headingComp}
    </div>
  );
};

export default TabHeadings;
