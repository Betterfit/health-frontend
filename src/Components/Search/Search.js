import React from "react";

const Search = () => (
  <>
    <label for="search"></label>
    <div className="m-1 flex max-w-sm">
      <div className="relative flex-grow">
        <div className="absolute inset-y-0 left-0 pl-1 flex items-center pointer-events-none"></div>
        <input
          id="search"
          className="form-input block w-full border border-gray-400 box-border pl-2 py-2 transition ease-in-out duration-150 text-lg"
          placeholder="Search Products"
        ></input>
      </div>
      <button className="-ml-px relative inline-flex items-center px-4 py-2 text-base leading-5 rounded-r uppercase font-medium text-white font-bold tracking-normal bg-gray-700 hover:bg-gray-600 focus:outline-none transition ease-in-out duration-150">
        Search
      </button>
    </div>
  </>
);
export default Search;
