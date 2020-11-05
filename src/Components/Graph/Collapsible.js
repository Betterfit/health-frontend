import React, {useState} from 'react';
import Expand from "Images/Icons/expand.svg";
import { ReactSVG } from 'react-svg'


const Collapsible = ({heading, children, onClickEvent}) => {
	const [isOpen, setIsOpen] = useState(false);

	const collapsibleChangeIsOpen = () => {
		setIsOpen(!isOpen)
	}

	return (
        <div className="bg-gray-300  w-6/12 rounded flex flex-col items-start justify-center p-2 border-2 border-white">
          <div className="w-full flex flex-row justify-between m-1 px-4" onClick={collapsibleChangeIsOpen}>
          	 <button 
                className="text-betterfit-graphite text-sm" 
              >
          		  {heading}
          	 </button>
             <ReactSVG 
              className={isOpen ? 'transform rotate-180' : 'transform rotate-0'}
              src={Expand} 
              beforeInjection={
                (svg) => { 
                  svg.setAttribute('style', 'width: 22px')}}  />
          </div>
            {isOpen &&
            <div className="h-32 overflow-y-scroll">
              <div className="bg-white rounded relative z-20border-transparent">
                  {children.map((region) => {
                  	return <button className="text-betterfit-grey-blue text-xs"
                  				onClick={(e) => onClickEvent(e, heading, region)}
                  			>
                  				{region}
                  		</button>
                  })
              	 }
              </div>
            </div>
          }
          </div>
	)
}

export default Collapsible;