import React, { useState, useEffect } from "react";

function FlatButton({ id_tag, text, onClick }) {
  return (
    <div className="relative">
      <button
        type="submit"
        className={
          "absolute rounded-md w-full flex justify-center py-3 border border-transparent font-semibold " +
          " transition duration-150 ease-in-out capitalize text-base bg-betterfit-pale-blue border border-betterfit-basic-blue"
        }
      >
        {text}
      </button>
    </div>
  );
}

export default FlatButton;
