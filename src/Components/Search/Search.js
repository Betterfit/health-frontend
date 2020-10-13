import React, {useState,useRef} from "react";
import { useHistory } from 'react-router-dom'
import { ReactSVG } from 'react-svg'
import SearchIcon from 'Images/Icons/search-icon.svg'
import Close from 'Images/Icons/close.svg';
const Search = ({type}) => {
  const [searchValue, setSearchValue ] = useState('');
  const searchRef = useRef(null);
  const history = useHistory();
  const searchQuery = () => {
    setSearchValue(searchRef.current.value)
    history.push(`/dashboard/inventory/search?search=${searchRef.current.value}`);
  }
  const clearSearchQuery = () => {
    history.push(`/dashboard/inventory`);
  }
  const [showInput , setShowInput] = useState(false);
  
  if(type === "icon" ){
    return(
      <div className={`flex items-center h-full bg-gray-300 ${showInput ? 'absolute w-full z-10  border-b-2 border-gray-400 ' : 'relative'}`}> 
        <button className="button-reset" onClick={() => setShowInput(!showInput)}>
          <ReactSVG src={SearchIcon} />
        </button>
        {showInput && (
          <>
            <div className="flex ml-2 flex-1 ">
              <div className="relative flex-grow">
                <div className="absolute inset-y-0 left-0 pl-1 flex items-center pointer-events-none"></div>
                <input
                  id="search"
                  className="input-reset form-input block w-full box-border pl-2 py-2 transition ease-in-out duration-150 text-lg bg-transparent"
                  placeholder="Search Products"
                  ref={searchRef}
                  onChange={()=>{
                    clearTimeout();
                    setTimeout(()=>{
                      searchQuery()
                    },1000)
                  }}
                />
              </div>
              {/* <button onClick={searchQuery} className="-ml-px relative inline-flex items-center px-4 py-2 text-base leading-5 rounded-r uppercase font-medium text-white font-bold tracking-normal bg-gray-700 hover:bg-gray-600 focus:outline-none transition ease-in-out duration-150">
                Search
              </button> */}
            </div>
            <button className="button-reset" onClick={() => {
              if(searchRef.current.value){
                searchRef.current.value = "";
                clearSearchQuery();
                setShowInput(!showInput)
              }else{
                setShowInput(!showInput)
              }
            }}>
              <ReactSVG src={Close} />
            </button>
          </>
        )} 
      </div>
    )
  }else{
    return(
      <div> 
        <label for="search"></label>
        <div className="flex max-w-sm">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-1 flex items-center pointer-events-none"></div>
            <input
              id="search"
              className="form-input block w-full border border-gray-400 box-border pl-2 py-3 transition ease-in-out duration-150 text-lg"
              placeholder="Search Products"
              ref={searchRef}
            />
          </div>
          <button onClick={searchQuery} className="-ml-px relative inline-flex items-center px-4 py-2 text-base leading-5 rounded-r uppercase font-medium text-white font-bold tracking-normal bg-gray-700 hover:bg-gray-600 focus:outline-none transition ease-in-out duration-150">
            Search
          </button>
        </div>
      </div>
    )
  }

};
export default Search;
