import clsx from "clsx";
import Translator from "Helpers/Translator";
import React from "react";

const TitleUnderLine = ({
  title,
  nounderline,
  extraclasses,
}: {
  title: string;
  nounderline?: boolean;
  extraclasses?: string;
}) => {
  return (
    <h2
      className={clsx(
        "text-dark-blue text-3xl pb-6 mb-6",
        extraclasses,
        !nounderline && "border-b border-title-border"
      )}
    >
      {Translator(title)}
    </h2>
  );
};

export default TitleUnderLine;
