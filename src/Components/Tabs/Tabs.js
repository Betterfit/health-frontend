import React, {useState} from 'react'

// components
import TabHeadings from './TabHeadings';


const Tabs = ({tabs}) => {
    console.log(tabs)
    const [activeTab , setActiveTab] = useState(tabs[0].key)

    const Headings = tabs.map(tab => {
        return({
                heading:tab.heading,
                key:tab.key
            }   
        )
    });

    const headingChangeActive = (key) => {
        console.log(key)
        setActiveTab(key);   
    }

    return(
        <div>
            <TabHeadings headings={Headings} headingFunction={headingChangeActive}   />
            {tabs.map(tab => {
                return(
                    <div class={`${tab.key === activeTab ? 'opacity-100' : 'opacity-0' }`} >
                        {tab.content}
                    </div>
                )
            })} 
        </div>
    )
}

export default Tabs