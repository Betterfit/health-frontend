import React, {useState,useRef} from "react";
import { useLocation } from "react-router-dom";
import { useHistory } from 'react-router-dom'
import { ReactSVG } from 'react-svg'
import SearchIcon from 'Images/Icons/search-icon.svg'
import Translator from "Helpers/Translator";
let myTimeOut;
function useQuery() {
  return new URLSearchParams(useLocation().search);
}
const ProductSearch = ({type,extraClasses,CategoryName, CategoryID, orderId}) => {
  const [searchValue, setSearchValue ] = useState('');
  const searchRef = useRef(null);
  const history = useHistory();
  
  const searchQuery = () => {
    setSearchValue(searchRef.current.value)
    if(searchRef.current.value.length == 0){
      history.push(`/dashboard/${type == "new" ? 'new-order':`edit-order/${orderId}`}/category/${CategoryName}/${CategoryID}/search`);
    }else{
      history.push(`/dashboard/${type == "new" ? 'new-order':`edit-order/${orderId}`}/category/${CategoryName}/${CategoryID}/search?search=${searchRef.current.value}&category=${CategoryID}`);
    }
  }
  
  const clearSearchQuery = () => {
    history.push(`/dashboard/${type = "new" ? 'new-order':'edit-order'}`);
  }

  const [showInput , setShowInput ] = useState(false);
  
    return(
      <div className={`flex items-center h-full bg-betterfit-pale-blue items-center px-6 py-1 ${extraClasses}`} style={{borderRadius:30}}> 
        <ReactSVG className="ml-2 mr-2" src={SearchIcon} />
        <div className="relative flex-grow">
        <label htmlFor="search" aria-label="Search"></label>
          <input
            id="search"
            className="input-reset form-input block w-full box-border pl-2 py-2 transition ease-in-out duration-150 text-lg bg-transparent"
            placeholder={`${Translator("Search")} ${Translator("Products")}`}
            ref={searchRef}
            onChange={()=>{
              clearTimeout(myTimeOut);
              myTimeOut = setTimeout(()=>{
                searchQuery()
              },1000)
            }}
          />
        </div>
        {/* <button onClick={searchQuery} className="-ml-px relative inline-flex items-center px-4 py-2 text-base leading-5 rounded-r uppercase font-medium text-white font-bold tracking-normal bg-gray-700 hover:bg-gray-600 focus:outline-none transition ease-in-out duration-150">
          Search
        </button> */}
      </div>
    )
  
  

};
export default ProductSearch;
