import Translator from "Helpers/Translator";
import React from "react";
import uuid from "react-uuid";

const TableHead = ({ TableHead }) => {
  return (
    <thead>
      <tr>
        {TableHead.map((head) => {
          return (
            <th
              key={uuid()}
              className="px-4 pb-2 pt-6 text-left leading-4 uppercase font-semibold text-10 tracking-extra-wide text-gray-600 opacity-50"
            >
              {Translator(head)}
            </th>
          );
        })}
      </tr>
    </thead>
  );
};
export default TableHead;
