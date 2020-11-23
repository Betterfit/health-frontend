import React, { useState } from "react";
import Translator from "Helpers/Translator";

function Checkbox({ id_tag, name, value = false, setValue }) {
  const [checked , setChecked] = useState(value);
  return (
    <>
      <label className="flex items-center">
        <div
          className={
            "select-none uppercase text-xxs tracking-extra-wide pr-3 " +
            (value ? "text-betterfit-highlight-red font-semibold" : "text-betterfit-blue font-medium")
          }
        >
          {Translator(name)}
        </div>
        <div
          className={
            "bg-white border rounded w-6 h-6 flex flex-shrink-0 justify-center items-center focus-within:border-blue-500 " +
            (value ? "border-betterfit-highlight-red" : "border-gray-400")
          }
        >
          <input
            type="checkbox"
            className="opacity-0 absolute"
            onChange={(e) => {
              setChecked(!checked);
              setValue(!checked);
            }}  
          />
          <svg
            className={`fill-current text-betterfit-highlight-red m-auto pointer-events-none ${checked ? `block` : `hidden`} `}
            viewBox="-3 -4 20 20"
          >
            <path d="M12.361.334a1.547 1.547 0 00-1.185-.317c-.42.063-.798.297-1.053.652L5.347 7.334l-2.62-2.74c-.299-.314-.705-.49-1.13-.49-.423 0-.83.176-1.129.49-.3.313-.468.738-.468 1.182 0 .443.168.869.468 1.182l3.122 3.269c.264.268.579.475.924.607a2.505 2.505 0 002.13-.158c.324-.182.608-.434.833-.738l5.204-7.263c.254-.355.363-.8.303-1.24a1.689 1.689 0 00-.623-1.1z" />
          </svg>
        </div>
      </label>
    </>
  );
}

export default Checkbox;
