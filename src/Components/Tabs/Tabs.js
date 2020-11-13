import React, {useState} from 'react'
import uuid from 'react-uuid'
// components
import TabHeadings from './TabHeadings';


const Tabs = ({tabs,headingComp,amount}) => {
    const [activeTab , setActiveTab] = useState(tabs[0].key)

    const Headings = tabs.map(tab => {
        return({
                heading:tab.heading,
                key:tab.key,
                amount:tab.amount
            }   
        )
    });
 
    const headingChangeActive = (key) => {
        setActiveTab(key);   
    }

    return(
        <div className="flex-1">
            <TabHeadings headings={Headings} headingFunction={headingChangeActive} headingComp={headingComp} amount={amount ? amount : false}   />
            {tabs.map((tab, index) => {
                return(
                    <div key={uuid()} className={`${tab.key === activeTab ? 'opacity-100 visible' : 'opacity-0 hidden' }`} >
                        {tab.content}
                    </div>
                )
            })} 
        </div>
    )
}

export default Tabs