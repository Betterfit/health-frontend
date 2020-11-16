import React from "react";
import Translator from "Helpers/Translator";

function Input_Field({ id_tag, name, type, value, onChange }) {

  return (
    <>
      <label htmlFor={id_tag} className="sr-only">
        {Translator(name)}
      </label>
      <div className="relative">
        <input
          id={id_tag}
          type={type}
          className="py-3 pl-4 form-input block w-full text-lg border-gray-400 border rounded"
          placeholder={Translator(name)}
          value={value}
          onChange={onChange}
          required
        />
      </div>
    </>
  );
}

export default Input_Field;
