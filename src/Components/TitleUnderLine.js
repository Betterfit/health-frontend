import React from 'react'

const TitleUnderLine = ({title,nounderline,extraclasses}) => {
   
    return(
        <>
        {nounderline && (
            <h2 class={`text-gray-700 text-3xl py-4 font-extrabold mb-6 ${extraclasses}`}>{title}</h2>
        )} 
        {!nounderline && (
            <h2 class={`text-gray-700 text-3xl py-4 border-b-2 border-gray-400 font-extrabold mb-6 ${extraclasses}`}>{title}</h2>
        )} 
        </>   
    )
}

export default TitleUnderLine