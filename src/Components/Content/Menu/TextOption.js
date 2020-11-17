import React from "react";
import Translator from "Helpers/Translator";

  const TextOption = ({ value, href, onClick }) => {
    return (
      <a
        onClick={onClick}
        className="block py-3 text-sm focus:outline-none focus:bg-gray-100 capitalize cursor-pointer "
        role="menuitem"
        href={href}
      >
        {Translator(value)}
      </a>
    );
  };

  export default TextOption;





