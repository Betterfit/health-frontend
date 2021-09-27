import Translator from "Helpers/Translator";
import React from "react";

const CategoryTitle = ({
  title,
  icon = undefined,
  background_color = "#E4EFFC",
}: {
  title: string;
  icon?: string;
  background_color?: string;
}) => {
  const backgroundColor = {
    background: background_color,
  };
  const translatedTitle = Translator(title);
  return (
    <div className="flex flex-row pb-4 pt-2 ">
      {icon && (
        <div
          className="rounded-full h-12 w-12 flex items-center mr-2 ml-1"
          style={backgroundColor}
        >
          <img className="m-auto h-8 w-8" src={icon} alt={translatedTitle} />
        </div>
      )}
      <h2 className="text-betterfit-graphite text-3xl">{translatedTitle}</h2>
    </div>
  );
};

export default CategoryTitle;
