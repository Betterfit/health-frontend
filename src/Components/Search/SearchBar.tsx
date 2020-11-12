import SearchIcon from "Images/Icons/search-icon.svg";
import React, { useRef } from "react";
import { ReactSVG } from "react-svg";

interface SearchBarProps {
    performSearch: (searchTerm: string) => void;
    msDelay?: number;
}
/**
 * This search bar component allows for a delay between changing search terms
 */
const SearchBar = ({ performSearch, msDelay = 500 }: SearchBarProps) => {
    const searchRef = useRef<HTMLInputElement>(null);

    const searchTimeoutID = useRef<any>(null);
    const afterDelay = () => {
        const searchString = searchRef.current?.value;
        if (searchString || searchString === "") performSearch(searchString);
    };
    return (
        <div
            className={`flex items-center max-h-50 bg-betterfit-pale-blue items-center px-6 py-1`}
            style={{ borderRadius: 30 }}
        >
            <ReactSVG className="ml-2 mr-2" src={SearchIcon} />
            <div className="relative flex-grow">
                <input
                    id="search"
                    className="input-reset form-input block w-full box-border pl-2 py-2 transition ease-in-out duration-150 text-lg bg-transparent"
                    placeholder="Search Resources"
                    ref={searchRef}
                    onChange={(e) => {
                        // Removes the previously queued up search
                        // Prevents excessive requests being sent
                        if (searchTimeoutID.current)
                            clearTimeout(searchTimeoutID.current);
                        // search will be performed after msDelay microseconds without input change
                        searchTimeoutID.current = setTimeout(
                            afterDelay,
                            msDelay
                        );
                    }}
                />
            </div>
        </div>
    );
};
export default SearchBar;
