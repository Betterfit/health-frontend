import React, {useState} from 'react'


const TabHeadings = ({headings,headingFunction,headingComp}) => {
    const [activeHeading , setActiveHeading ] = useState(headings[0].key);
    // console.log(activeHeading);
    return(
        <div class="flex flex-row mb-8 items-end">
            <div class="border-b border-gray-400 flex flex-row flex-1 ">
                {headings.map(heading =>{
                    return(
                        <div class="pr-6">
                            <button class={`text-gray-700 py-4 focus:outline-none ${heading.key === activeHeading ? 'border-b-2 border-gray-700':''}`} onClick={() => {headingFunction(heading.key); setActiveHeading(heading.key) }}>{heading.heading}</button>
                        </div>
                    )
                })}
            </div>
            <div >
                {headingComp}
            </div>
        </div>
    )
}

export default TabHeadings;