import React from "react";
import TableBody from "./TableBody";
import TableHead from "./TableHead";

const Table = ({ TableData, excludeKeys, excludeValues }) => {
  let TableHeadData = [];
  let TableBodyData = [];

  TableData.forEach((variant) => {
    let keys = Object.keys(variant);
    let values = Object.entries(variant);
    keys.forEach((key) => {
      if (!TableHeadData.includes(key)) {
        TableHeadData.push(key);
      }
    });
    TableBodyData.push(values);
  });
  // exclude keys from filter
  TableHeadData = TableHeadData.filter((item) => !excludeKeys.includes(item));
  TableBodyData = TableBodyData.map((row) => {
    return row.filter((item) => {
      if (!excludeValues.includes(item[0])) {
        return item;
      }
    });
  });

  return (
    <div className="flex flex-col mt-10 mb-4">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="border-b border-gray-200">
            <table className="min-w-full p-4">
              <TableHead TableHead={TableHeadData} />
              <TableBody TableBody={TableBodyData} />
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
