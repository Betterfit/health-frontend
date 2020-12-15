import React from "react";
import TableHead from "./TableHead";
import TableBody from "./TableBody";

const Table = ({ TableData, link, extraClasses, buttonType }) => {
  const TableHeadData = [];
  const TableBodyData = [];
  let nooptions = false;
  let removeAtIndex;
  let statusIndex;

  TableData.map((variant) => {
    let keys = Object.keys(variant);
    let values = Object.values(variant);
    keys.forEach((key, index) => {
      if (!TableHeadData.includes(key)) {
        if (key !== "pk" && key !== "item_url") {
          // console.log(`key ${variant[key]}`);
          TableHeadData.push(key);
          if (key == "status") {
            statusIndex = index;
          }
        } else {
          removeAtIndex = index;
        }
      }
    });
    TableBodyData.push(values);
  });

  return (
    <div className="flex flex-col mt-10 mb-4">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="border-b border-gray-200">
            <table
              className={`min-w-full p-4 table-auto ${
                extraClasses ? extraClasses : ""
              }`}
            >
              <TableHead TableHead={TableHeadData} />
              <TableBody
                buttonType={buttonType}
                link={link}
                NoOptions={nooptions}
                TableBody={TableBodyData}
                removeAtIndex={removeAtIndex}
                statusIndex={statusIndex}
                variantID={TableData.pk}
              />
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
