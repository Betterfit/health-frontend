import React from "react";
import Button from "Components/Forms/Button";
import { Transition } from "@tailwindui/react";

  const TextOption = ({ value, href, onClick }) => {
    return (
      <a
        onClick={onClick}
        className="block py-3 text-sm focus:outline-none focus:bg-gray-100 capitalize cursor-pointer "
        role="menuitem"
        href={href}
      >
        {value}
      </a>
    );
  };

  export default TextOption;





