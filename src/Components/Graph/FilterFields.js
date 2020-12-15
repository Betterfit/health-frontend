import React from "react";
import Collapsible from "./Collapsible";

const FilterFields = ({ filterData, onClickEvent }) => {
  return (
    <div className="h-16 flex flex-wrap justify-start items-start pr-4 max-w-screen-md">
      {filterData.map((field, i) => {
        return (
          <Collapsible
            heading={field.heading}
            children={field.content}
            onClickEvent={onClickEvent}
            key={i}
          />
        );
      })}
    </div>
  );
};

export default FilterFields;
