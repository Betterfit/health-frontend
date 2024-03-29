import Translator from "Helpers/Translator";
import React from "react";
let timeout;

function QuantityInput({
  id_tag = undefined,
  name,
  readOnly = false,
  value,
  readValue = undefined,
  quantityUpdate = undefined,
}) {
  let readOnlyStyle = "focus:outline-none bg-betterfit-soft-blue shadow-none";
  return (
    <>
      <div className="inline-block ">
        <label
          htmlFor={id_tag}
          className="uppercase font-medium text-betterfit-graphite text-xxs tracking-extra-wide pr-3 "
        >
          {Translator(name)}
        </label>
        <input
          id={id_tag}
          type="number"
          className={
            "py-2 pl-2 pr-2 form-input w-20 text-base border-gray-400 border rounded shadow-inner focus:outline-none " +
            (readOnly ? readOnlyStyle : "")
          }
          value={value}
          readOnly={readOnly}
          min="0"
          onChange={(e) => {
            if (readValue) readValue(e.target.value);
            var val = e.target.value;
            if (quantityUpdate) {
              clearTimeout(timeout);
              timeout = setTimeout(() => {
                console.log(val);
                quantityUpdate({ quantity: val });
              }, 1000);
            }
          }}
        />
      </div>
    </>
  );
}

export default QuantityInput;
