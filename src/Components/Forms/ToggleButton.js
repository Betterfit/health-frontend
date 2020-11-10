import React, { useState, useEffect, useCallback } from "react";

const Button = ({ toggle, active, value, onChange, text }) => {
  return (
    <button
      className={
        "flex items-center flex-grow py-3 m-1 justify-center transition-colors duration-300 ease-in focus:outline-none hover:text-blue-400 focus:text-blue-400 rounded px-4 py-2 " +
        (active
          ? " pointer-events-none active bg-betterfit-basic-blue text-white"
          : "bg-white text-betterfit-navy'")
      }
      id="lang"
      value={value}
      onClick={toggle}
      type="button"
    >
      {text}
    </button>
  );
};

const ToggleButton = ({ option1, option2, changeValue }) => {
  const [active, setActive] = useState(option1.active);
  const toggle = (e) => {
    setActive(!active);
    changeValue(e);
  };

  return (
    <div>
      <span className="uppercase text-betterfit-graphite text-10 tracking-extra-wide ">
        Default Language
      </span>
      <div className="text-base leading-none border-2 border-gray-200 rounded flex">
        <Button
          key={option1.label}
          toggle={toggle}
          onChange={changeValue}
          active={active}
          value={option1.value}
          text={option1.label}
        ></Button>
        <Button
          key={option2.label}
          toggle={toggle}
          onChange={changeValue}
          active={!active}
          value={option2.value}
          text={option2.label}
        ></Button>
      </div>
    </div>
  );
};
export default ToggleButton;
