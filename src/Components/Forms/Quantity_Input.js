import React from "react";
let timeout;
function Quantity_Input({ id_tag, name, readOnly=false, value, readValue , quantityUpdate}) {
 let readOnlyStyle = "focus:outline-none bg-betterfit-soft-blue shadow-none"
  return (
    <>
      <div className="inline-block ">
        <label
          htmlFor={id_tag}
          className="uppercase font-medium text-betterfit-graphite text-xxs tracking-extra-wide pr-3 "
        >
          {name}
        </label>
        <input
          id={id_tag}
          type="number"
          className= {"py-2 pl-2 pr-2 form-input w-20 text-base border-gray-400 border rounded shadow-inner focus:outline-none " + (readOnly ? readOnlyStyle : "" ) }
          value={value}
          readOnly={readOnly}
          onChange={(e) => {
            if (readValue)
              readValue(e.target.value);
              var val = e.target.value;
              if(quantityUpdate){
                clearTimeout(timeout);
                timeout = setTimeout( () => {
                  console.log(val);
                  quantityUpdate({"quantity":val,})    
                },1000);
              }
          }}

        />
      </div>
    </>
  );
}

export default Quantity_Input;
