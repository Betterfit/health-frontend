import Translator from "Helpers/Translator";
import React from "react";

interface InputFieldProps {
  idTag: string;
  name: string;
  type: string;
  value: string | number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function InputField({ idTag, name, type, value, onChange }: InputFieldProps) {
  return (
    <>
      <label htmlFor={idTag} className="sr-only">
        {Translator(name)}
      </label>
      <div className="relative">
        <input
          id={idTag}
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
