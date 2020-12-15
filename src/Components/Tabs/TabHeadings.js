import React, { useState } from "react";
import uuid from "react-uuid";
import Translator from "Helpers/Translator";

const TabHeadings = ({
  headings,
  headingFunction,
  headingComp,
  amount,
  setActive,
}) => {
  const [activeHeading, setActiveHeading] = useState(
    setActive ? setActive : headings[0].key
  );
  return (
    <div
      key={uuid()}
      className="flex flex-col-reverse md:flex-row mb-8 flex-1 md:items-center relative border-b border-gray-400 "
    >
      <div className="flex flex-row flex-1 h-full mr-3 px-4">
        {headings.map((heading) => {
          return (
            <div key={uuid()} className="pr-6 " key={heading.key}>
              <button
                className={` pt-4 pb-2 focus:outline-none relative mr-2 ${
                  heading.key === activeHeading
                    ? "border-b-2 border-blue text-blue font-semibold"
                    : "text-betterfit-navy"
                }`}
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
