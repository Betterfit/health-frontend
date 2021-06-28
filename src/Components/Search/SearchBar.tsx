import SearchIcon from "Images/Icons/search-icon.svg";
import React, { useEffect, useRef } from "react";
import { ReactSVG } from "react-svg";

interface SearchBarProps {
  performSearch: (searchTerm: string) => void;
  msDelay?: number;
  placeholderText?: string;
  className?: string;
  startingText?: string;
}
/**
 * A search bar component that allows for a delay between performing searches.
 * This should boost performance on weaker devices by reducing the number of
 * requests sent/processed.
 * You may need to add !important to some css rules in the specified class.
 */
const SearchBar = ({
  performSearch,
  msDelay = 500,
  placeholderText = "",
  className = "",
  startingText = "",
}: SearchBarProps) => {
  const searchRef = useRef<HTMLInputElement>(null);
  // prevent text from being cleared on component rerender
  // see the UserTable for an example of where this is needed
  useEffect(() => {
    if (searchRef.current && startingText !== "")
      searchRef.current.value = startingText;
  }, [startingText, searchRef]);
  const searchTimeoutID = useRef<any>(null);
  const afterDelay = () => {
    const searchString = searchRef.current?.value;
    if (searchString || searchString === "") performSearch(searchString);
  };
  return (
    <div
      className={`flex items-center max-h-50 bg-white px-6 py-1 ${className}`}
      style={{ borderRadius: 30 }}
    >
      <ReactSVG className="ml-2 mr-2" src={SearchIcon} />
      <div className="relative flex-grow">
        <input
          id="search"
          key="search"
          className="input-reset form-input block w-full box-border pl-2 py-2 transition ease-in-out duration-150 text-base bg-transparent text-faded-blue"
          placeholder={placeholderText}
          aria-label={placeholderText}
          ref={searchRef}
          // clears/resets placeholder text on focus
          onBlur={(e) => (e.target.placeholder = placeholderText)}
          onFocus={(e) => (e.target.placeholder = "")}
          autoComplete="false"
          onChange={(e) => {
            // Removes the previously queued up search
            // Prevents excessive requests being sent
            if (searchTimeoutID.current) clearTimeout(searchTimeoutID.current);
            // search will be performed after msDelay microseconds without input change
            searchTimeoutID.current = setTimeout(afterDelay, msDelay);
          }}
        />
      </div>
    </div>
  );
};
export default SearchBar;
