import React, {useState} from 'react';

const SideBarTabs = ({tabs}) => {

	const [activeTab , setActiveTab] = useState(tabs[0].key)

	const tabChangeActive = (key) => {
        // console.log(key)
        setActiveTab(key);   
    }

	return (
		<div>
		{
			tabs.map(tab => {
			  return (                    
				<div key={tab.key} className={`mb-1 flex justify-center rounded-l-lg bg-tag-light-blue ${tab.key === activeTab ? 'border-betterfit-basic-blue border' : 'border-0'}`}>
                  <button 
                  	className={`text-xs ${tab.key === activeTab ? 'text-betterfit-basic-blue' :'text-betterfit-graphite'}`}
                  	onClick={() => {tabChangeActive(tab.key)}}
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