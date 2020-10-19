import React, { useState, useEffect } from "react";


function Checkbox({ id_tag, name, value = false, setValue }) {

  return (
    <>
      <label class="flex items-center">
        <div
          class={
            "select-none uppercase text-xxs tracking-extra-wide pr-3 " +
            (value ? "text-betterfit-highlight-red font-semibold" : "text-betterfit-blue font-medium")
          }
        >
          {name}
        </div>
        <div
          class={
            "bg-white border rounded w-6 h-6 flex flex-shrink-0 justify-center items-center focus-within:border-blue-500 " +
            (value ? "border-betterfit-highlight-red" : "border-gray-400")
          }
        >
          <input
            type="checkbox"
            class="opacity-0 absolute"
            onChange={(e) => {
                setValue(!value);
            }}
          />
          <svg
            class="fill-current hidden w-4 h-4 text-betterfit-highlight-red pointer-events-none"
            viewBox="0 0 20 20"
          >
            <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
          </svg>
        </div>
      </label>
    </>
  );
}

export default Checkbox;