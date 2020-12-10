import React, { useState } from "react";
import Translator from "Helpers/Translator";

function Checkbox({ id_tag, name, value = false, setValue, title }) {
  const [checked, setChecked] = useState(value);
  return (
    <>
      <label className="flex items-center" title={title}>
        <div
          className={
            "select-none uppercase text-xxs tracking-extra-wide pr-3 " +
            (value
              ? "text-betterfit-highlight-red font-semibold"
              : "text-betterfit-blue font-medium")
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
            className={`fill-current text-betterfit-highlight-red m-auto pointer-events-none ${
              checked ? `block` : `hidden`
            } `}
            width="13"
            height="11"
            viewBox="0 0 13 11"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.3612 0.334094C12.0219 0.0682009 11.5957 -0.0459026 11.1761 0.0168359C10.7565 0.0795744 10.3778 0.314027 10.1232 0.668716L5.34676 7.33439L2.72771 4.59316C2.42805 4.27953 2.02163 4.10333 1.59785 4.10333C1.17408 4.10333 0.767656 4.27953 0.468 4.59316C0.168345 4.9068 0 5.33218 0 5.77572C0 6.21926 0.168345 6.64464 0.468 6.95827L3.58964 10.2269C3.85355 10.4952 4.16864 10.7022 4.51428 10.8342C4.85991 10.9663 5.22829 11.0204 5.59531 10.9931C5.96232 10.9658 6.31969 10.8577 6.64401 10.6758C6.96833 10.494 7.2523 10.2424 7.47731 9.93775L12.6809 2.67511C12.9349 2.32021 13.0439 1.87431 12.9839 1.43535C12.924 0.996404 12.7 0.600311 12.3612 0.334094Z"
              fill="#B74554"
            />
          </svg>
        </div>
      </label>
    </>
  );
}

export default Checkbox;
