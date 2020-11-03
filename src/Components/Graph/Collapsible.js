import React, {useState} from 'react';


const Collapsible = ({heading, children, onClickEvent}) => {
	const [isOpen, setIsOpen] = useState(false);

	const collapsibleChangeIsOpen = () => {
		setIsOpen(!isOpen)
	}

	return (
        <div className="bg-gray-300 w-6/12 rounded flex flex-col items-center justify-center py-3">
        	<button 
            className="text-betterfit-graphite" 
            onClick={collapsibleChangeIsOpen}
          >
        		{heading}
        	</button>
            <div className="px-3 overflow-y-scroll">
              <div className="bg-white rounded relative z-20border-transparent">
                {isOpen &&
                  children.map((region) => {
                  	return <button className="text-betterfit-grey-blue text-xs"
                  				onClick={(e) => onClickEvent(e, heading, region)}
                  			>
                  				{region}
                  		</button>
                  })
              	 }
              </div>
            </div>
          </div>
	)
}

export default Collapsible;