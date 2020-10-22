import React from "react";

function InputFieldLabel({ id_tag, name, type, value, onChange }) {
  return (
    <div>
      <label htmlFor={id_tag} className="block uppercase betterfit-graphite text-xxs tracking-extra-wide opacity-50 py-2">
      {name}
        </label>
      <div className="relative">
        <input
          id={id_tag}
          type={type}
          className="py-3 pl-4 form-input block w-full text-lg border-gray-400 border rounded capitalize"
          placeholder={name}
          value={value}
          onChange={onChange}
          required
        />
      </div>
    </div>
  );
}

export default InputFieldLabel;