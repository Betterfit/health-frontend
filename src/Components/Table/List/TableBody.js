import React from "react";
import { ReactSVG } from "react-svg";
import Edit from "Images/Icons/edit.svg";
import { NavLink } from "react-router-dom";
import Button from "Components/Content/Button";
import StatusButton from "Components/Content/StatusButton";
const TableBody = ({
  TableBody,
  removeAtIndex,
  statusIndex,
  link,
  buttonType,
}) => {
  return (
    <tbody>
      {TableBody.map((row, pindex) => {
        if (pindex % 2 == 0) {
          return (
            <React.Fragment key={`table_row_${pindex}`}>
              {link && (
                <tr className="table-row bg-white border border-white  hover:border-betterfit-highlight-blue">
                  {row.map((r, index) => {
                    if (index !== removeAtIndex)
                      if (index == statusIndex)
                        return (
                          <td
                            key={`table_td_${pindex}_${index}`}
                            className="px-4 py-4 whitespace-no-wrap w-8 text-sm leading-5 text-betterfit-graphite"
                          >
                            <NavLink
                              className="px-4 py-4 text-sm leading-5 text-betterfit-graphite block"
                              to={`${link}${row[removeAtIndex]}`}
                            >
                              {buttonType === "statusbutton" && (
                                <StatusButton status={r} />
                              )}
                              {buttonType !== "statusbutton" && (
                                <Button
                                  text={r}
                                  color={
                                    r === "shipped"
                                      ? "status-dark-green"
                                      : "betterfit-basic-blue"
                                  }
                                  text_size="text-sm"
                                />
                              )}
                            </NavLink>
                          </td>
                        );
                      else
                        return (
                          <td
                            key={`table_td_${pindex}_${index}`}
                            className="whitespace-no-wrap px-4 py-4"
                          >
                            <NavLink
                              className="text-sm leading-5 text-betterfit-graphite"
                              to={`${link}${row[removeAtIndex]}`}
                            >
                              {r}
                            </NavLink>
                          </td>
                        );
                  })}
                </tr>
              )}
              {!link && (
                <tr className="bg-white border border-white table-row">
                  {row.map((r, index) => {
                    if (index !== removeAtIndex)
                      if (index == statusIndex)
                        return (
                          <td
                            key={`table_td_${pindex}_${index}`}
                            className="px-4 py-4 whitespace-no-wrap w-8 text-sm leading-5 text-betterfit-graphite"
                          >
                            <span className="px-4 py-4 text-sm leading-5 text-betterfit-graphite">
                              {buttonType === "statusbutton" && (
                                <StatusButton status={r} />
                              )}
                              {buttonType !== "statusbutton" && (
                                <Button
                                  text={r}
                                  color={
                                    r === "shipped"
                                      ? "status-dark-green"
                                      : "betterfit-basic-blue"
                                  }
                                  text_size="text-sm"
                                />
                              )}
                            </span>
                          </td>
                        );
                      else
                        return (
                          <td
                            key={`table_td_${pindex}_${index}`}
                            className="px-4 py-4 whitespace-no-wrap text-sm leading-5 text-betterfit-graphite"
                          >
                            {r}
                          </td>
                        );
                  })}
                </tr>
              )}
            </React.Fragment>
          );
        } else {
          return (
            <React.Fragment key={`table_row_${pindex}`}>
              {link && (
                <tr className="table-row bg-table-row border m-1 border-table-row relative hover:border-betterfit-highlight-blue">
                  {row.map((r, index) => {
                    if (index !== removeAtIndex)
                      if (index == statusIndex)
                        return (
                          <td
                            key={`table_td_${pindex}_${index}`}
                            className="px-4 py-4 whitespace-no-wrap w-8 text-sm leading-5 text-betterfit-graphite"
                          >
                            <NavLink
                              className="px-4 py-4 text-sm leading-5 text-betterfit-graphite block"
                              to={`${link}${row[removeAtIndex]}`}
                            >
                              {buttonType === "statusbutton" && (
                                <StatusButton status={r} />
                              )}
                              {buttonType !== "statusbutton" && (
                                <Button
                                  text={r}
                                  color={
                                    r === "shipped"
                                      ? "status-dark-green"
                                      : "betterfit-basic-blue"
                                  }
                                  text_size="text-sm"
                                />
                              )}
                            </NavLink>
                          </td>
                        );
                      else
                        return (
                          <td
                            key={`table_td_${pindex}_${index}`}
                            className="whitespace-no-wrap px-4 py-4 "
                          >
                            <NavLink
                              className="text-sm leading-5 text-betterfit-graphite"
                              to={`${link}${row[removeAtIndex]}`}
                            >
                              {r}
                            </NavLink>
                          </td>
                        );
                  })}
                </tr>
              )}
              {!link && (
                <tr className="bg-table-row border border-table-row table-row">
                  {row.map((r, index) => {
                    if (index !== removeAtIndex)
                      if (index == statusIndex)
                        return (
                          <td
                            key={`table_td_${pindex}_${index}`}
                            className="px-4 py-4 whitespace-no-wrap w-8 text-sm leading-5 text-betterfit-graphite"
                          >
                            <span className="px-4 py-4 text-sm leading-5 text-betterfit-graphite">
                              {buttonType === "statusbutton" && (
                                <StatusButton status={r} />
                              )}
                              {buttonType !== "statusbutton" && (
                                <Button
                                  text={r}
                                  color={
                                    r === "shipped"
                                      ? "status-dark-green"
                                      : "betterfit-basic-blue"
                                  }
                                  text_size="text-sm"
                                />
                              )}
                            </span>
                          </td>
                        );
                      else
                        return (
                          <td
                            key={`table_td_${pindex}_${index}`}
                            className="px-4 py-4 whitespace-no-wrap text-sm leading-5 text-betterfit-graphite"
                          >
                            {r}
                          </td>
                        );
                  })}
                </tr>
              )}
            </React.Fragment>
          );
        }
      })}
    </tbody>
  );
};
export default TableBody;
