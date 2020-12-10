import React, {useState} from 'react';

const SideBarTabs = ({tabs, activeTab, handleClick, clearTab}) => {

	const tabChangeActive = (key, heading) => {
        handleClick(key, heading);   
    }

	return (
		<div className="flex flex-col py-2 justify-start">
		{
			tabs.map(tab => {
			  return (                    
				<div key={tab.key} className={`mb-2 flex justify-center rounded-l-lg border border-betterfit-basic-blue border-opacity-0 hover:border-opacity-100
                                      ${tab.key === activeTab ? 'border-opacity-100 bg-white' : 'bg-gray-300 border-0 '}`}>
                  <button 
                  	className={`text-xs py-2 focus:outline-none ${tab.key === activeTab ? 'text-betterfit-basic-blue font-semibold' :'text-blue'}`}
                  	onClick={() => {tabChangeActive(tab.key, tab.heading)}}
                  >
                  	{tab.heading}
                  </button>
                </div>
              )
			})
        }
          <div key={clearTab.key} className="mb-2 px-1 py-2 flex justify-center rounded-l-lg bg-status-red translate-x-1 border border-status-dark-red border-opacity-0 hover:border-opacity-100">
            <button 
              className="text-xs text-status-dark-red" 
              onClick={() => {tabChangeActive(clearTab.key, clearTab.heading)}}
            >
                {clearTab.heading}
            </button>
          </div>
        </div>
	)
}

export default SideBarTabs;