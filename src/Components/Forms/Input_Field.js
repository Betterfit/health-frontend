import Translator from "Helpers/Translator";
import React from "react";

function InputField({ id_tag, name, type, value, onChange }) {
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

export default InputField;
