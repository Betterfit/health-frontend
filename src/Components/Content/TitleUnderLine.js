import React from 'react'

const TitleUnderLine = ({title,nounderline,extraclasses}) => {
   
    return(
        <>
        {nounderline && (
            <h2 className={`text-dark-blue text-3xl py-4 pb-6 mb-6 ${extraclasses}`}>{title}</h2>
        )} 
        {!nounderline && (
            <h2 className={`text-dark-blue text-3xl py-4 pb-6 border-b border-gray-400 mb-6 ${extraclasses}`}>{title}</h2>
        )} 
        </>   
    )
}

export default TitleUnderLine