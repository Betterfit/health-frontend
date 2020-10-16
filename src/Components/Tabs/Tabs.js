import React, {useState} from 'react'

// components
import TabHeadings from './TabHeadings';


const Tabs = ({tabs,headingComp,amount}) => {
    // console.log(tabs)
    const [activeTab , setActiveTab] = useState(tabs[0].key)

    const Headings = tabs.map(tab => {
        return({
                heading:tab.heading,
                key:tab.key
            }   
        )
    });

    const headingChangeActive = (key) => {
        // console.log(key)
        setActiveTab(key);   
    }

    return(
        <div>
            <TabHeadings headings={Headings} headingFunction={headingChangeActive} headingComp={headingComp} amount={amount ? 6 : null}   />
            {tabs.map(tab => {
                return(
                    <div className={`${tab.key === activeTab ? 'opacity-100 visible' : 'opacity-0 hidden' }`} >
                        {tab.content}
                    </div>
                )
            })} 
        </div>
    )
}

export default Tabs