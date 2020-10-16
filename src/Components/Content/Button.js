import React from "react";
import { ReactSVG } from "react-svg";
import Plus from "Images/Icons/plus.svg";
import Edit from "Images/Icons/edit.svg";
//To add an svg icon - add component to svg and add to svgMap
//So if svgName = 'plus' will call the Plus component


const Button = ({ text, onClick, solid = true, text_size = "text-lg",color, extraClasses }) => {
  let css_add_on = solid
    ? `text-white bg-${color} hover:bg-betterfit-darker-blue px-4`
    : "text-betterfit-betterfit-navy bg-transparent border border-betterfit-grey";
  return (

      <button
        onClick={ onClick }
        type="submit"
        className={
          ` ${css_add_on}
           rounded-md flex no-wrap justify-center py-3 border border-transparent font-semibold px-4
           focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 
           transition duration-150 ease-in-out capitalize uppercase ${text_size} ${extraClasses}`
        }
        style={{minWidth:100}}
      >
        {text}
      </button>
    
  );
};

export default Button;
