import React, { useState, useEffect } from "react";
const tranform = {
  transform: "translateX(" + -50 + "%)",
};
function FlatButton({ id_tag, text }) {
  return (
    <button
      type="submit"
      className={
        "absolute top-1/4 left-1/2 rounded-md flex justify-center py-3 px-7 border border-transparent font-semibold " +
        " transition duration-150 ease-in-out capitalize text-status-dark-blue text-sm bg-betterfit-pale-blue border border-betterfit-highlight-blue"
      }
      style={tranform}
    >
      {text}
    </button>
  );
}

export default FlatButton;
