import React, {useState,useRef} from "react";
import { useHistory } from 'react-router-dom'
import { ReactSVG } from 'react-svg'
import SearchIcon from 'Images/Icons/search-icon.svg'
import Close from 'Images/Icons/close.svg';


const OrderSearch = ({type}) => {
  const [searchValue, setSearchValue ] = useState('');
  const searchRef = useRef(null);
  const history = useHistory();
  
  const searchQuery = () => {
    setSearchValue(searchRef.current.value)
    history.push(`/dashboard/orders/search?search=${searchRef.current.value}`);
  }
  const clearSearchQuery = () => {
    history.push(`/dashboard/orders`);
  }

  const [showInput , setShowInput] = useState(false);
  
    return(
      <div className={`flex items-center h-full bg-betterfit-pale-blue items-center px-6 py-1`} style={{borderRadius:30}}> 
        <ReactSVG className="ml-2 mr-2" src={SearchIcon} /> 
        <div className="relative flex-grow">
        <label for="search" className="hidden">Search</label>
          <input
            id="search"
            className="input-reset form-input block w-full box-border pl-2 py-2 transition ease-in-out duration-150 text-lg bg-transparent"
            placeholder="Search Orders"
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
    )
  
  

};
export default OrderSearch;
