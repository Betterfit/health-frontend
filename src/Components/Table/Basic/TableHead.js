import React from "react";
import Translator from "Helpers/Translator";
import uuid from "react-uuid";
const TableHead = ({ TableHead }) => {
  return (
    <thead>
      <tr>
        {TableHead.map((head) => {
          return (
            <th
              key={uuid()}
              className="px-4 py-3 bg-white text-left leading-4 uppercase text-10 tracking-extra-wide text-gray-600 opacity-50"
            >
              {Translator(head.replace(/[_-]/g, " "))}
            </th>
          );
        })}
      </tr>
    </thead>
  );
};
export default TableHead;
