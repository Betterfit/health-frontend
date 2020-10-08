import React from "react";

function Quantity_Input({ id_tag, name, readOnly=false, value, readValue }) {
 let readOnlyStyle = "focus:outline-none bg-betterfit-soft-blue shadow-none"
  return (
    <>
      <div class="inline-block sm:px-5">
        <label
          for={id_tag}
          className="uppercase font-medium text-betterfit-graphite text-xxs tracking-extra-wide pr-3 "
        >
          {name}
        </label>
        <input
          id={id_tag}
          type="number"
          class= {"py-2 pl-4 pr-2 form-input w-20 text-base border-gray-400 border rounded shadow-inner " + (readOnly ? readOnlyStyle : null ) }
          value={value}
          readOnly={readOnly}
          onChange={(e) => {
             if (readValue)
                readValue(e.target.value);
            
          }}

        />
      </div>
    </>
  );
}

export default Quantity_Input;
