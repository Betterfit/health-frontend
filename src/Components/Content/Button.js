import React from "react";
import Translator from "Helpers/Translator";

const Button = ({
  text,
  onClick,
  solid = true,
  text_size = "text-lg",
  color,
  extraClasses,
  pill,
}) => {
  let css_add_on = solid
    ? `text-white bg-${color} px-4`
    : "text-betterfit-betterfit-navy bg-transparent border border-betterfit-grey";
  return (
    <button
      onClick={onClick}
      type="submit"
      className={` ${css_add_on}
           rounded-md flex no-wrap justify-center py-3 border border-transparent font-bold px-4
           transition duration-150 ease-in-out capitalize uppercase ${text_size} ${extraClasses} ${
        pill ? "pill" : ""
      }`}
      style={{ minWidth: 100 }}
    >
      {Translator(text)}
    </button>
  );
};

// focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 hover:bg-betterfit-darker-blue

export default Button;
