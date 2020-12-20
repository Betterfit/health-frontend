import React from "react";
import Translator from "Helpers/Translator";

const TitleUnderLine = ({ title, nounderline, extraclasses }) => {
  return (
    <>
      {nounderline && (
        <h2 className={`text-dark-blue text-3xl pb-6 mb-6 ${extraclasses}`}>
          {Translator(title)}
        </h2>
      )}
      {!nounderline && (
        <h2
          className={`text-dark-blue text-3xl pb-6 border-b border-title-border  mb-6 ${extraclasses}`}
        >
          {Translator(title)}
        </h2>
      )}
    </>
  );
};

export default TitleUnderLine;
