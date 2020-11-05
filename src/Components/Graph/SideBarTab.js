import React, {useState} from 'react';

const SideBarTabs = ({tabs, activeTab, handleClick}) => {

	const tabChangeActive = (key, heading) => {
        // console.log(key)
        handleClick(key, heading);   
    }

	return (
		<div>
		{
			tabs.map(tab => {
			  return (                    
				<div key={tab.key} className={`mb-2 py-2 flex justify-center rounded-l-lg ${tab.key === activeTab ? 'border-betterfit-basic-blue border bg-white' : 'bg-gray-300 border-0'}`}>
                  <button 
                  	className={`text-xs ${tab.key === activeTab ? 'text-betterfit-basic-blue font-semibold' :'text-blue'}`}
                  	onClick={() => {tabChangeActive(tab.key, tab.heading)}}
                  >
                  	{tab.heading}
                  </button>
                </div>
              )
			})
        }
        </div>
	)
}

export default SideBarTabs;