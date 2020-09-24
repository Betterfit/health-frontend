import React, {useState} from 'react'


const TabHeadings = ({headings,headingFunction}) => {
    const [activeHeading , setActiveHeading ] = useState(headings[0].key);
    console.log(activeHeading);
    return(
        <div class="flex flex-row border-b border-gray-400 mb-8">
        {headings.map(heading =>{
            return(
                <div class="pr-6">
                    <button class={`text-gray-700 py-4 focus:outline-none ${heading.key === activeHeading ? 'border-b-2 border-gray-700':''}`} onClick={() => {headingFunction(heading.key); setActiveHeading(heading.key) }}>{heading.heading}</button>
                </div>
            )
        })}
        </div>
    )
}

export default TabHeadings;