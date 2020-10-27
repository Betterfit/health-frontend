import React, { useState, useEffect, useCallback } from "react";

const Button = ({ toggle, active, value }) => {
  return (
    <button
      className={
        "flex items-center flex-grow py-3 m-1 justify-center transition-colors duration-300 ease-in focus:outline-none hover:text-blue-400 focus:text-blue-400 rounded px-4 py-2 " +
        (active
          ? " pointer-events-none active bg-betterfit-basic-blue text-white"
          : "bg-white text-betterfit-navy'")
      }
      id="grid"
      value={value}
      onClick={toggle}
      type="button"
    >
      <span>{value}</span>
    </button>
  );
};

const ToggleButton = ({ option1, option2, changeValue}) => {
  const [active, setActive] = useState(option1.active);
  const toggle = () => {
    setActive(!active);
    active ? changeValue(option2.value) : changeValue(option1.value)
  };

  return (
    <div>
      <span className="uppercase text-betterfit-graphite text-10 tracking-extra-wide ">
        Default Language
      </span>
      <div className="text-base leading-none border-2 border-gray-200 rounded flex">
        <Button toggle={toggle} onChange={changeValue} active={active} value={option1.label}></Button>
        <Button toggle={toggle} onChange={changeValue}  active={!active} value={option2.label}></Button>
      </div>
    </div>
  );
};
export default ToggleButton;
