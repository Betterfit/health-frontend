import React, {useState} from 'react'
import uuid from 'react-uuid'
import Translator from "Helpers/Translator";

const TabHeadings = ({headings,headingFunction,headingComp,amount}) => {
    const [activeHeading , setActiveHeading ] = useState(headings[0].key);
    // console.log(activeHeading);
    return(
        <div key={uuid()} className="flex flex-col-reverse md:flex-row mb-8 flex-1 md:items-center relative ">
            <div className="flex flex-row flex-1 h-full border-b border-gray-400 mr-3">
                {headings.map((heading) =>{
                    return(
                        <div key={uuid()} className="pr-6 text-blue" key={heading.key}>
                            <button className={`text-blue py-4 focus:outline-none relative mr-2 ${heading.key === activeHeading ? 'border-b-2 border-blue font-semibold':''}`} onClick={() => {headingFunction(heading.key); setActiveHeading(heading.key) }}>
                                
                                {Translator(heading.heading)}
                                {amount && (
                                    <span className="absolute text-sm text-blue ml-1" style={{marginTop:-5}}>{heading.amount}</span>
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