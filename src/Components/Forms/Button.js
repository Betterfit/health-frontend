import React from "react";

//To add an svg icon - add component to svg and add to svgMap
//So if svgName = 'plus' will call the Plus component
const Button = ({ text, svgName, onClick }) => {
  const plus = () => {
    return (
      <svg
        class="ml-3 -mr-1 mt-tiny h-6 w-6"
        xmlns="http://www.w3.org/2000/svg"
        width="30"
        height="30"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#ffffff"
        strokeWidth="3.5"
        strokeLinecap="butt"
        strokeLinejoin="round"
      >
        <line x1="12" y1="5" x2="12" y2="19"></line>
        <line x1="5" y1="12" x2="19" y2="12"></line>
      </svg>
    );
  };
  const svgMap = {
    plus: plus(),
  };

  return (
    <span className="block w-full shadow-sm flex items-baseline">
      <button
        onClick = {onClick}
        type="submit"
        className="rounded w-full flex justify-center py-2 border border-transparent text-lg font-semibold text-white bg-basic-blue hover:bg-darker-blue focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out uppercase"
      >
        <span>{text}ww</span>
        {svgMap[svgName]}
      </button>
    </span>
  );
};

export default Button;
