import React, { useState} from "react";
import Translator from "Helpers/Translator";


function Checkbox({ id_tag, name, value = false, setValue, resetErrors }) {
  const [checked , setChecked] = useState(false);

  setValue(checked);
  return (
    <>
      <label className="flex items-center">
        <div
          className={
            "select-none uppercase text-xxs tracking-extra-wide pr-3 " +
            (checked ? "text-betterfit-green  font-semibold" : "text-betterfit-blue font-medium")
          }
        >
          {Translator(name)}
        </div>
        <div
          className={
            "bg-white border rounded w-6 h-6 flex flex-shrink-0 justify-center items-center focus-within:border-blue-500 " +
            (checked ? "border-betterfit-green " : "border-gray-400")
          }
        >
          <input
            type="checkbox"
            className="opacity-0 absolute"
            onChange={(e) => {
              setChecked(!checked);
              resetErrors();
              setValue(!checked);
            }}
          />
          <svg
            className={`fill-current w-4 h-4 text-betterfit-green pointer-events-none ${checked ? `block` : `hidden`} `}
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
