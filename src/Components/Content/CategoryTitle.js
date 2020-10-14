import React from 'react'

const CategoryTitle = ({title, icon}) => {
    const backgroundColor = {
        background: icon['background-color']
    }
    //TODO - add in svg when passed through
    const color = icon['color']
    const svg = icon['svg']
   
    return(
        <div className="flex flex-row pb-4 pt-2 ">
        <div className="rounded-full h-12 w-12 flex items-center mr-2 " style={backgroundColor}>
        </div>
        <h2 className="text-betterfit-graphite text-3xl">{title}</h2> 
        </div>
    )
}

export default CategoryTitle