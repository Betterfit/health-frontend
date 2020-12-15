import StatusButton from "Components/Content/StatusButton";
import EmptyImage from "Images/emptyImage.png";
import React from "react";
import uuid from "react-uuid";

const TableBody = ({ TableBody }) => {
  return (
    <tbody>
      {TableBody.map((row, index) => {
        let imageIndex;
        if (index % 2 == 0) {
          return (
            <tr key={uuid()} className="bg-table-row border-table-row">
              {row.map((r, index) => {
                switch (r[0]) {
                  case "priority":
                    // code block
                    return (
                      <td
                        key={uuid()}
                        className="px-4 py-4 whitespace-no-wrap w-8 text-sm leading-5 text-betterfit-graphite pr-8"
                      >
                        <StatusButton
                          status={r[1] === "stat" ? "stat" : "regular"}
                        />
                      </td>
                    );
                  case "product_image":
                    imageIndex = index;
                    return false;
                  case "item":
                    return (
                      <td
                        key={uuid()}
                        className="px-4 py-4 whitespace-no-wrap text-base leading-5 text-betterfit-graphite"
                      >
                        <div className="flex items-center">
                          <img
                            className="w-24 mr-2"
                            role="none"
                            src={
                              row[imageIndex][1]
                                ? `${row[imageIndex][1]}`
                                : EmptyImage
                            }
                          />
                          <span className="font-bold text-betterfit-basic-blue ml-2">
                            {r[1]}
                          </span>
                        </div>
                      </td>
                    );
                  default:
                    return (
                      <td
                        key={uuid()}
                        className="px-4 py-4 whitespace-no-wrap text-base leading-5 text-betterfit-grey-blue"
                      >
                        <div className="flex items-center">
                          {/* <img className="w-24 mr-2" src={`${row[imageIndex]}`} /> */}
                          {/* <span className="font-bold text-betterfit-basic-blue">{r}</span> */}
                          {r[1]}
                        </div>
                      </td>
                    );
                }
              })}
            </tr>
          );
        } else {
          return (
            <tr key={uuid()} className="bg-white border-white">
              {row.map((r, index) => {
                switch (r[0]) {
                  case "priority":
                    // code block
                    return (
                      <td
                        key={uuid()}
                        className="px-4 py-4 whitespace-no-wrap w-8 text-sm leading-5 text-betterfit-graphite pr-8"
                      >
                        <StatusButton
                          status={r[1] === "stat" ? "stat" : "regular"}
                        />
                      </td>
                    );
                  case "product_image":
                    imageIndex = index;
                    return false;
                  case "item":
                    return (
                      <td
                        key={uuid()}
                        className="px-4 py-4 whitespace-no-wrap text-base leading-5 text-betterfit-graphite"
                      >
                        <div className="flex items-center">
                          <img
                            className="w-24 mr-2"
                            role="none"
                            src={
                              row[imageIndex][1]
                                ? `${row[imageIndex][1]}`
                                : EmptyImage
                            }
                          />
                          <span className="font-bold text-betterfit-basic-blue ml-2">
                            {r[1]}
                          </span>
                        </div>
                      </td>
                    );
                  default:
                    return (
                      <td
                        key={uuid()}
                        className="px-4 py-4 whitespace-no-wrap text-base leading-5 text-betterfit-grey-blue"
                      >
                        <div className="flex items-center">
                          {/* <img className="w-24 mr-2" src={`${row[imageIndex]}`} /> */}
                          {/* <span className="font-bold text-betterfit-basic-blue">{r}</span> */}
                          {r[1]}
                        </div>
                      </td>
                    );
                }
              })}
            </tr>
          );
        }
      })}
    </tbody>
  );
};
export default TableBody;
