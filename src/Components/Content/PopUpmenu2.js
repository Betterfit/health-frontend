import React from "react";
import Button from "Components/Forms/Button";
import { Transition } from "@tailwindui/react";

  const PopupText = ({ value, href, onClick }) => {
    return (
      <a
        onClick={onClick}
        className="block py-3 text-sm focus:outline-none focus:bg-gray-100 capitalize "
        role="menuitem"
        href={href}
      >
        {value}
      </a>
    );
  };

  export default PopupText;





