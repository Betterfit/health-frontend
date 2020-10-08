import React, { useState, useEffect } from "react";


//from https://dev.to/alexkhismatulin/update-boolean-state-right-with-react-hooks-3k2i
const useToggle = (initialState) => {
  const [isToggled, setIsToggled] = React.useState(initialState);

  const toggle = React.useCallback(() => setIsToggled((state) => !state), [
    setIsToggled,
  ]);

  return [isToggled, toggle];
};

function Checkbox({ id_tag, name, initialval = false }) {
  const [priority, changeColor] = useToggle(initialval);

  return (
    <>
      <label class="flex justify-start items-start">
        <div
          class={
            "select-none uppercase text-xxs tracking-extra-wide pr-3 " +
            (priority ? "text-betterfit-highlight-red" : "text-betterfit-blue")
          }
        >
          {name}
        </div>
        <div
          class={
            "bg-white border rounded w-6 h-6 flex flex-shrink-0 justify-center items-center mr-2 focus-within:border-blue-500 " +
            (priority ? "border-betterfit-highlight-red" : "border-gray-400")
          }
        >
          <input
            type="checkbox"
            class="opacity-0 absolute"
            onChange={(e) => {
              changeColor(!priority);
            }}
          />
          <svg
            class="fill-current hidden w-4 h-4 text-betterfit-highlight-red pointer-events-none"
            viewBox="0 0 20 20"
          >
            <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
          </svg>
        </div>
      </label>
    </>
  );
}

export default Checkbox;
