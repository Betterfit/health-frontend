import React, { useState, useEffect } from "react";


function CheckboxConfirm({ id_tag, name, value = false, setValue }) {
  const [checked , setChecked] = useState(false);
  return (
    <>
      <label className="flex items-center">
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
            className="opacity-0 absolute"
            onChange={(e) => {
              setChecked(!checked)
              setValue(!checked);
            }}
          />
          <svg
            className="fill-current hidden w-4 h-4 text-betterfit-highlight-green pointer-events-none"
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
