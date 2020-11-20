import React  from "react";
import Translator from "Helpers/Translator";
const tranform = {
  transform: "translateX(" + -50 + "%)",
};
function FlatButton({ text, onClick, extras }) {
  return (
    <button
      onClick={onClick}
      type="button"
      className={
        "absolute md:whitespace-nowrap top-1/4 left-1/2 w-3/4 rounded-md flex justify-center py-3 px-1 w-1/2 border border-transparent font-semibold " +
        " transition duration-150 ease-in-out capitalize text-status-dark-blue text-sm bg-betterfit-pale-blue border border-betterfit-highlight-blue " +
        (extras ? extras : "")
      }
      style={tranform}
    >
      {Translator(text)}
    </button>
  );
}

export default FlatButton;
