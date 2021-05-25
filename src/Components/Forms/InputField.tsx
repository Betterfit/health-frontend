import Translator from "Helpers/Translator";
import React from "react";

interface InputFieldProps {
  /** HTML id, falls back to name if not specified */
  idTag?: string;
  name: string;
  type: string;
  value: string | number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  autoFocus?: boolean;
}

function InputField({
  idTag,
  name,
  type,
  value,
  onChange,
  autoFocus = false,
}: InputFieldProps) {
  const id = idTag ? idTag : name;
  return (
    <>
      <label htmlFor={id} className="sr-only">
        {Translator(name)}
      </label>
      <div className="relative">
        <input
          id={id}
          type={type}
          className="py-3 pl-4 form-input block w-full text-lg border-gray-400 border rounded"
          placeholder={Translator(name)}
          value={value}
          onChange={onChange}
          autoFocus={autoFocus}
          required
        />
      </div>
    </>
  );
}

export default InputField;
