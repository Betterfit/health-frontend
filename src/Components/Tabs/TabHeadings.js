import React, {useState} from 'react'


const TabHeadings = ({headings,headingFunction,headingComp}) => {
    const [activeHeading , setActiveHeading ] = useState(headings[0].key);
    // console.log(activeHeading);
    return(
        <div className="flex flex-col-reverse md:flex-row mb-8 flex-1 md:items-center relative  border-b border-gray-400">
            <div className="flex flex-row flex-1 h-full">
                {headings.map(heading =>{
                    return(
                        <div className="pr-6" key={heading.key}>
                            <button className={`text-gray-700 py-4 focus:outline-none ${heading.key === activeHeading ? 'border-b-2 border-gray-700':''}`} onClick={() => {headingFunction(heading.key); setActiveHeading(heading.key) }}>{heading.heading}</button>
                        </div>
                    )
                })}
            </div>
            {headingComp}
        </div>
    )
}

export default TabHeadings;