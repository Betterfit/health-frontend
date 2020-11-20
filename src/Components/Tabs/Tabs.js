import React, {useState} from 'react'
import uuid from 'react-uuid'

// components
import TabHeadings from './TabHeadings';

const Tabs = ({tabs,headingComp,amount,tabCallBack,setActive = null}) => {
    const [activeTab , setActiveTab] = useState(setActive ? setActive : tabs[0].key)

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
        if(tabCallBack){
            tabCallBack(key);
        }
    }

    return(
        <div className="flex-1">
            <TabHeadings headings={Headings} headingFunction={headingChangeActive} headingComp={headingComp} amount={amount ? amount : false} setActive={setActive}   />
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