import React from "react";
import Translator from "Helpers/Translator";

function InputFieldLabel({ id_tag, name, type, value, onChange, error, required=true }) {
  return (
    <div>
      <label htmlFor={id_tag} className="block uppercase betterfit-graphite text-10 tracking-extra-wide opacity-50 py-2">
      {Translator(name)}
        </label>
      <div className="relative">
        <input
          id={id_tag}
          type={type}
          className="py-3 pl-4 form-input block w-full text-lg border-gray-400 border rounded capitalize"
          placeholder= {Translator(name)}
          value={value}
          onChange={onChange}
          required={required}
        />
      </div>
      <span className="error text-sm text-status-dark-red pt-1">
          {error}
        </span>
    </div>
  );
}

export default InputFieldLabel;