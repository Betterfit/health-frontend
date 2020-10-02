import React from "react";

const Status = ({text, color, outline}) => (
    <div class="flex flex-shrink-0 items-center pl-3 pr-2">
    <div class="uppercase text-gray-700 text-sm px-2 py-1 border border-gray-700 rounded">    {text}</div>
  </div>

);
export default Status;
