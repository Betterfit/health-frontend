import React from "react";
import StatusButton from "Components/Content/StatusButton";

const TableHeader = ({ HeaderData, Status }) => {
  return (
    <div className="flex flex-row justify-between p-4">
      {HeaderData && 
        Object.keys(HeaderData).map((head, i) => (
          <div className="flex flex-col" key={i}>
            <span className="text-left text-xs leading-4 font-normal uppercase tracking-wider uppercase text-white">
              {head}
            </span>
            <span className="pt-1 text-left text-base leading-4 font-semibold text-white">
              {HeaderData[head]}
            </span>
          </div>
        ))

      }
        <StatusButton status={Status} />
    </div>
  );
};
export default TableHeader;
