import React from "react";
import Translator from "Helpers/Translator";

const TableHead = ({ TableHead }) => {
  return (
    <thead>
      <tr>
        {TableHead.map((head, i) => {
          return (
            <th
              key={i}
              className="px-4 py-3  text-left uppercase leading-4 font-semibold text-10 tracking-extra-wide text-gray-600 opacity-50 "
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
