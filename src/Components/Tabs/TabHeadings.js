import React, {useState} from 'react'


const TabHeadings = ({headings,headingFunction,headingComp,amount}) => {
    const [activeHeading , setActiveHeading ] = useState(headings[0].key);
    // console.log(activeHeading);
    return(
        <div className="flex flex-col-reverse md:flex-row mb-8 flex-1 md:items-center relative ">
            <div className="flex flex-row flex-1 h-full border-b border-gray-400 mr-3">
                {headings.map(heading =>{
                    return(
                        <div className="pr-6 text-blue" key={heading.key}>
                            <button className={`text-blue py-4 focus:outline-none relative ${heading.key === activeHeading ? 'border-b-2 border-blue font-semibold':''}`} onClick={() => {headingFunction(heading.key); setActiveHeading(heading.key) }}>
                                {heading.heading}
                                {amount && (
                                    <span className="absolute text-sm text-blue ml-1" style={{marginTop:-5}}>{amount}</span>
                                )}
                            </button>
                        </div>
                    )
                })}
            </div>
            {headingComp}
        </div>
    )
}

export default TabHeadings;