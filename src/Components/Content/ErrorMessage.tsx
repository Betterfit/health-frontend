import React from "react";

/**
 * Displayed if something goes wrong fetching data from her backend.
 * Very generic and minimalistic atm, but this way we can be consistent atleast
 */
export const ErrorMessage = ({
  text = "Something went wrong.",
}: {
  text?: string;
}) => {
  return <div>{text}</div>;
};
