import Translator from "Helpers/Translator";
import React from "react";

const CategoryTitle = ({ title, icon, background_color, color }) => {
  const outlinecolor = color != "" ? color : "#234499";
  const svg = icon;
  const backgroundColor = {
    background: background_color != "" ? background_color : "#E4EFFC",
  };
  const translatedTitle = Translator(title);
  return (
    <div className="flex flex-row pb-4 pt-2 ">
      <div
        className="rounded-full h-12 w-12 flex items-center mr-2 "
        style={backgroundColor}
      >
        <img className="m-auto h-8 w-8" src={svg} alt={translatedTitle} />
      </div>
      <h2 className="text-betterfit-graphite text-3xl">{translatedTitle}</h2>
    </div>
  );
};

export default CategoryTitle;
